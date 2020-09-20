import React, { useState } from "react"
import { Flex, Text, Radio, RadioGroup } from "@chakra-ui/core"
import { Line } from "react-chartjs-2"

export default function PercentageCompareChart({ data }) {
  const [dayCount, setDayCount] = useState("14")
  const chartFirst30 = data.slice(0, dayCount)
  const chartData = {
    labels: chartFirst30.map((item) => item.date).reverse(),
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
        data: chartFirst30.map((item) => item.testPercentage).reverse(),
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
        pointHoverBorderColor: "rgb(220,220,220)",
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 10,
        data: chartFirst30.map((item) => item.casePercentage).reverse(),
      },
    ],
  }

  const options = {
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "% Percentage Changes",
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: `Last ${dayCount} Days`,
          },
        },
      ],
    },
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
        <Text fontSize="0.8rem">
          This chart aims to show the change in the new number of COVID-19 cases
          in the UK, compared to the change in the new number of tests completed
          in a 24 hour period.
        </Text>

        <Text fontSize="0.8rem">
          If the two lines follow each other and are close together, then the
          change in numbers can be seen to reflect each other, so a 10% increase
          in tests causes a 10% increase in new cases.
        </Text>
        <Text fontSize="0.8rem">
          If there is a significantly higher spike on the green line compared to
          the blue line. This indicates that there has been an increase in cases
          that is not directly related to a change in testing numbers. The same
          is true for the opposite, a spike on the blue line would indicate that
          more testing has been done, but has not drastically increased the
          number of cases.
        </Text>
      </Flex>
      <RadioGroup
        onChange={(e) => setDayCount(e.target.value)}
        isInline
        value={dayCount}
        spacing={5}
        style={{ alignSelf: "center" }}
      >
        <Radio value="7" variantColor="green" borderColor="lightGrey">
          Last 7 Days
        </Radio>
        <Radio value="14" variantColor="green" borderColor="lightGrey">
          Last 14 Days
        </Radio>
        <Radio value="28" variantColor="green" borderColor="lightGrey">
          Last 28 Days
        </Radio>
      </RadioGroup>
      <Line
        data={chartData}
        maintainAspectRatio={false}
        height={100}
        options={options}
      />
      <Flex
        style={{
          margin: "1rem auto",
          flexDirection: "column",
          justifyContent: "center",
          width: "75%",
          minWidth: "290px",
          color: "dimgray",
          alignItems: "center",
        }}
      >
        <Text fontSize="0.8rem" style={{ margin: "1rem" }}>
          This data alone cannot indicate whether we are seeing a new wave of
          the virus. It needs to be taken in consideration with lots of other
          factors. For example, a 100% increase in cases could indicate a big
          jump, but if that is from 1 case to 2 cases, this is obviously not a
          big jump. So this chart alone does not provide a complete picture, but
          will hopefully help when there are larger jumps in the data.
        </Text>
      </Flex>
    </Flex>
  )
}
