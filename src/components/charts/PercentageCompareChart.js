import React, { useState } from "react"
import { Flex, Text, Radio, RadioGroup, Divider } from "@chakra-ui/core"
import { Line } from "react-chartjs-2"
import moment from "moment"

export default function PercentageCompareChart({ data }) {
  const [dayCount, setDayCount] = useState("14")
  const chartFirst30 = data.slice(0, 90)
  const dateArray = chartFirst30.map((item) => moment(item.date, "DD/MM/YYYY"))

  const chartData = {
    labels: dateArray.slice(0, dayCount).reverse(),
    datasets: [
      {
        label: "Tests",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(54, 167, 201,0.4)",
        borderColor: "rgb(54, 167, 201)",
        borderCapStyle: "butt",
        borderDash: [],
        borderWidth: 1,
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
        data: chartFirst30
          .map((item) => {
            if (item.testPercentage != -100) {
              return item.testPercentage
            } else {
              return null
            }
          })
          .slice(0, dayCount)
          .reverse(),
      },
      {
        label: "Cases",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(66, 201, 54,0.4)",
        borderColor: "rgb(66, 201, 54)",
        borderCapStyle: "butt",
        borderDash: [],
        borderWidth: 1,
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
        data: chartFirst30
          .map((item) => item.casePercentage)
          .slice(0, dayCount)
          .reverse(),
      },
      {
        label: "7-day Cases",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(150, 50, 50,0.4)",
        borderColor: "rgb(150, 50, 50)",
        borderCapStyle: "butt",
        borderDash: [],
        borderWidth: 1,
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(150, 50, 50)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(150, 50, 50)",
        pointHoverBorderColor: "rgb(220,220,220)",
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 10,
        data: chartFirst30
          .map((item) => item.sevenDayCasePercentage)
          .slice(0, dayCount)
          .reverse(),
      },
      {
        label: "7-day Tests",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(150, 150, 50,0.4)",
        borderColor: "rgb(150, 150, 50)",
        borderCapStyle: "butt",
        borderDash: [],
        borderWidth: 1,
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(150, 150, 50)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(150, 150, 50)",
        pointHoverBorderColor: "rgb(220,220,220)",
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 10,
        data: chartFirst30
          .map((item) => item.sevenDayTestPercentage)
          .slice(0, dayCount)
          .reverse(),
      },
    ],
  }

  const options = {
    responsive: true,
    title: {
      text: "Change in case and test numbers by percentage",
      display: true,
    },
    legend: {
      position: "bottom",
    },
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
          type: "time",
          time: {
            unit: "day",
            displayFormats: {
              month: "DD/MM",
            },
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
            padding: "0.5rem",
            alignSelf: "center",
            fontSize: "1.4rem",
            fontStyle: "bold",
            color: "black",
          }}
        >
          "Does the change in new cases reflect the change in the number of
          tests?"
        </Text>
        <Text fontSize="1rem" fontStyle="italic">
          I have been hearing a lot lately, that the rise in COVID-19 cases in
          the UK can be attributed to the rise in testing numbers. I hadn't
          really seen any data supporting this theory so thought I would attempt
          to find an answer to that statement.
        </Text>
        <Divider width={"50%"} alignSelf="center" />
        <Text fontSize="0.8rem" padding="0.2rem">
          This chart aims to show the change in the new number of COVID-19 cases
          in the UK, compared to the change in the new number of tests completed
          in a 24 hour period.
        </Text>
        <Text fontSize="0.8rem" padding="0.2rem">
          This is done by showing what percentage have these figures changed
          compared to the day before. The green line shows the cases, and the
          blue shows the tests. It also shows the average for the last 7 days in
          the cases and tests, the Red and Yellow lines.
        </Text>
        <Text fontSize="0.8rem" padding="0.2rem">
          If the lines follow each other and are close together, then the change
          in numbers can be seen to reflect each other, so a 10% increase in
          tests causes a 10% increase in new cases.
        </Text>
        <Text fontSize="0.8rem" padding="0.2rem">
          If there are significantly higher spikes on the green line compared to
          the blue line. This indicates that there has been an increase in cases
          that is not directly related to a change in testing numbers. The same
          is true for the opposite, spikes on the blue line would indicate that
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
        <Radio value="7" variantColor="green" borderColor="rgb(226, 232, 240)">
          Last 7 Days
        </Radio>
        <Radio value="14" variantColor="green" borderColor="rgb(226, 232, 240)">
          Last 14 Days
        </Radio>
        <Radio value="28" variantColor="green" borderColor="rgb(226, 232, 240)">
          Last 28 Days
        </Radio>
        <Radio value="90" variantColor="green" borderColor="rgb(226, 232, 240)">
          Last 90 Days
        </Radio>
      </RadioGroup>
      <Line data={chartData} maintainAspectRatio={false} options={options} />
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
        <Text fontSize="0.8rem" style={{ marginTop: "1rem" }}>
          If this chart is showing all the lines close together, then case
          numbers and test numbers will be following a similar trend, and it is
          likely any change in case number is due in part to the change in
          testing figures. Seeing a higher percentage of cases compared to tests
          is a worry, so if the green and red lines are constantly higher than
          the blue and yellow lines, then this is a cause for concern. Ideally
          if the UK is doing well against the spread of the COVID virus, we
          would see the Blue and Yellow lines higher then the 0 percentile line,
          and the Red and Green line consistently below the 0 percentile line
        </Text>
        <Text fontSize="0.8rem" style={{ margin: "1rem 0" }}>
          This data needs to be taken in consideration with other factors. For
          example, a 100% increase in cases could indicate a big jump, but if
          that is from 1 case to 2 cases, this is obviously not a big jump. So
          this chart alone does not provide a complete picture.
        </Text>
      </Flex>
    </Flex>
  )
}
