import React from "react"
import { Flex, Text } from "@chakra-ui/core"
import { Line } from "react-chartjs-2"

export default function MixedChart({
  bar,
  line,
  barTitle,
  lineTitle,
  dates,
  title,
  xTitle,
  ytitle,
}) {
  const chartData = {
    labels: dates.map((item) => item).reverse(),
    datasets: [
      {
        label: barTitle,
        type: "bar",
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(54, 167, 201, 1)",
        borderColor: "rgb(54, 167, 201)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(54, 167, 201)",
        pointBackgroundColor: "#fff",

        data: bar.map((item) => item).reverse(),
      },
      {
        label: lineTitle,
        fill: false,
        type: "line",
        lineTension: 0.1,
        backgroundColor: "rgba(66, 200, 30,0.7)",
        borderColor: "rgb(66, 200, 30)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(66, 200, 30)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(66, 200, 30)",
        pointHoverBorderColor: "rgb(220,220,220)",
        pointHoverBorderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 10,
        data: line.map((item) => item).reverse(),
      },
    ],
  }

  const options = {
    maintainAspectR: true,
    responsive: true,
    legend: {
      position: "bottom",
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: xTitle,
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: ytitle,
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
        flexGrow: 1,
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
          {title}
        </Text>
      </Flex>
      <Line data={chartData} maintainAspectR options={options} />
    </Flex>
  )
}
