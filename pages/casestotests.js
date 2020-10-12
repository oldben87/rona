import React from "react"
import { Flex, Text } from "@chakra-ui/core"
import { Line } from "react-chartjs-2"
import moment from "moment"
import {
  PageSection,
  ErrorText,
  TextRow,
  PageLayout
} from "../src/components/common"

export default function casestotests({ data }) {
  const { error } = data

  const chartData = {
    labels: data.map((item) => moment(item.date, "DD/MM/YYYY")).reverse(),
    datasets: [
      {
        label: "% - cases to tests done",
        fill: true,
        type: "line",
        lineTension: 0.1,
        backgroundColor: "rgba(200, 5, 11,0.3)",
        borderColor: "rgb(200, 5, 11)",
        borderCapStyle: "butt",
        borderDash: [],
        borderWidth: 1,
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(200, 5, 11)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 1,
        pointHoverBackgroundColor: "rgb(200, 5, 11)",
        pointHoverBorderColor: "rgb(220,220,220)",
        pointHoverBorderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 10,
        data: data.map((item) => item.percentage).reverse(),
      },
    ],
  }

  const options = {
    responsive: true,
    legend: {
      position: "top",
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "% of cases to tests",
          },
        },
      ],
      xAxes: [
        {
          type: "time",
          time: {
            unit: "month",
            displayFormats: {
              month: "MMM",
            },
          },
          scaleLabel: {
            display: false,
          },
        },
      ],
    },
  }

  return (
    <PageLayout tabTitle="Cases to Tests" headerTitle="Cases vs Tests">
        {error ? (
          <ErrorText>{error}</ErrorText>
        ) : (
          <>
            <PageSection>
              <Line data={chartData} options={options} />
            </PageSection>
            <PageSection
              background="#fff5f5"
              flexDir="column"
            >
              <Text as="h2" p={2} fontSize="3xl" color="red.800">Cases to tests</Text>
              <Flex overflow="auto">
                {data.slice(0, 31).map((item) => {
                  
                  return (
                    <Flex width="200px" direction="column" key={item.date} flexShrink={0} boxShadow="0 0 0.1rem 0.1rem rgba(0, 0, 0, 0.2)" m="2" p="2" paddingY="4" backgroundColor="white" borderRadius="0.2rem">
                      <TextRow>{item.date}</TextRow>
                      <TextRow><p>Cases:</p><p>{item.newCases.toLocaleString()}</p></TextRow>
                      <TextRow><p>Tests:</p><p>{item.newTests.toLocaleString()}</p></TextRow>
                      <TextRow>{item.percentage}%</TextRow>
                    </Flex>
                  )
                })}
              </Flex>
            </PageSection>
          </>
        )}
     </PageLayout>
  )
}

export async function getServerSideProps() {
  const headers = new Headers()
  headers.append("Pragma", "no-cache")
  headers.append("Cache-Control", "no-store, must-revalidate, no-cache")
  headers.append("Expires", 0)

  const structure = {
    date: "date",
    newCases: "newCasesByPublishDate",
    newTests: "newTestsByPublishDate",
  }

  const uriOverview =
    "https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure="

  const overview = await fetch(uriOverview + JSON.stringify(structure), headers)
    .then((response) => response.json())
    .then((data) => {
      if (data.statusCode > 204 || data.data === null) {
        throw new Error("Not good status")
      }
      const response = data.data
      // reformat to populate null responses from fetch
      const noNull = response.map((item) => {
        let result_no_null = {
          ...item,
          date: item.date.split("-").reverse().join("-"),
          newCases: item.newCases || 0,
          newTests: item.newTests || 0,
        }
        return result_no_null
      })

      return noNull.map((item, index) => {
        const percentage = Math.min(
          (item.newCases / item.newTests) * 100
        ).toFixed(2)
        if (percentage === "Infinity" || percentage === "NaN") {
          return {
            ...item,
            percentage: "0",
          }
        } else {
          return {
            ...item,
            percentage,
          }
        }
      })
    })
    .catch(() => {
      return { error: "Server Error Overview" }
    })

  return {
    props: {
      data: overview,
    },
  }
}
