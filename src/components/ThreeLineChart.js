import React from "react"
import { Flex } from "@chakra-ui/core"
import { Line } from "react-chartjs-2"
import moment from "moment"

export default function MixedChart({
  main,
  mainTitle,
  yTitle,
  baseLine,
  baseLineTitle,
  thirdLine,
  thirdLineTitle,
  dates,
  xTitle,
}) {
  const chartData = {
    labels: dates.map((item) => moment(item, "DD/MM/YYYY")).reverse(),
    datasets: [
      {
        label: baseLineTitle,
        fill: true,
        type: "line",
        lineTension: 0.1,
        backgroundColor: "rgba(200, 5, 11,0.3)",
        borderColor: "rgb(200, 5, 11)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(200, 5, 11)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(200, 5, 11)",
        pointHoverBorderColor: "rgb(220,220,220)",
        pointHoverBorderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 10,
        data: baseLine.reverse(),
      },
      {
        label: mainTitle,
        type: "line",
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(150, 5, 11, 0.3)",
        borderColor: "rgb(150, 11, 2)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(150, 5, 11)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(150, 5, 11)",
        pointHoverBorderColor: "rgb(220,220,220)",
        pointHoverBorderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 10,
        data: main.reverse(),
      },
      {
        label: thirdLineTitle,
        fill: true,
        type: "line",
        lineTension: 0.1,
        backgroundColor: "rgba(80, 5, 11,0.3)",
        borderColor: "rgb(80, 5, 11)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(80, 5, 11)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(80, 5, 11)",
        pointHoverBorderColor: "rgb(220,220,220)",
        pointHoverBorderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 10,
        data: thirdLine ? thirdLine.reverse() : null,
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
            labelString: yTitle,
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: xTitle,
          },
          type: "time",
          time: {
            unit: "month",
            displayFormats: {
              month: "MMM",
            },
          },
        },
      ],
    },
  }
  return (
    <Flex
      width={["100%", "100%", "70%", "70%"]}
      m="1rem auto"
      flexDir="row"
      justify="center"
      maxWidth="800px"
    >
      <Line data={chartData} options={options} />
    </Flex>
  )
}
