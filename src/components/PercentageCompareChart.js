import React from "react"
import { Flex, Text } from "@chakra-ui/core"
import { Line } from "react-chartjs-2"

export default function PercentageCompareChart({ data }) {
  const chartData = {
    labels: data.map((item) => item.date).reverse(),
    datasets: [
      {
        label: "Percentage in change of No# of tests",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(54, 167, 201,0.4)",
        borderColor: "rgb(54, 167, 201)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(54, 167, 201)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(54, 167, 201)",
        pointHoverBorderColor: "rgb(220,220,220)",
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 10,
        data: data.map((item) => item.testPercentage).reverse(),
      },
      {
        label: "Percentage in change of No# of cases",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(66, 201, 54,0.4)",
        borderColor: "rgb(66, 201, 54)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(66, 201, 54)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(66, 201, 54)",
        pointHoverBorderColor: "rgb(66, 201, 54)",
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 10,
        data: data.map((item) => item.casePercentage).reverse(),
      },
    ],
  }

  return (
    <Flex
      style={{
        margin: "1rem",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Flex
        style={{
          margin: "1rem auto",
          flexDirection: "column",
          justifyContent: "center",
          width: "75%",
          minWidth: "290px",
          color: "dimgray",
        }}
      >
        <Text
          style={{
            padding: "1rem",
            alignSelf: "center",
            fontStyle: "italic",
            color: "black",
          }}
        >
          "Does the change in new cases reflect the change in the number of
          tests, or is it something else?"
        </Text>
        <Text fontSize="0.7rem">
          This chart aims to show the change in the new number of COVID-19 cases
          in the UK, compared to the change in the new number of tests completed
          in a 24 hour period.
        </Text>

        <Text fontSize="0.7rem">
          If the two lines follow each other and are close together, then the
          change in numbers can be seen to reflect each other, so a 10% increase
          in tests causes a 10% increase in new cases.
        </Text>
        <Text fontSize="0.7rem">
          If there is a significantly higher spike on the green line compared to
          the blue line. This indicates that there has been an increase in cases
          that is not directly related to a change in testing numbers. The same
          is true for the opposite, a spike on the blue line would indicate that
          more testing has been done, but has not drastically increased the
          number of cases.
        </Text>
      </Flex>
      <Line data={chartData} maintainAspectRatio={false} height={100} />
    </Flex>
  )
}
