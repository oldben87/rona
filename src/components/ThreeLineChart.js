import React from 'react'
import { Flex } from '@chakra-ui/core'
import { Line } from 'react-chartjs-2'
import moment from 'moment'

export default function MixedChart({
  line1,
  line1Title,
  yTitle,
  line2,
  line2Title,
  thirdLine,
  thirdLineTitle,
  dates,
  xTitle,
}) {
  const chartData = {
    labels: dates.map((item) => moment(item, 'DD/MM/YYYY')).reverse(),
    datasets: [
      {
        label: line2Title,
        fill: true,
        type: 'line',
        lineTension: 0.1,
        backgroundColor: 'rgba(200, 5, 11,0.3)',
        borderColor: 'rgb(200, 5, 11)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderWidth: 1,
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgb(200, 5, 11)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(200, 5, 11)',
        pointHoverBorderColor: 'rgb(220,220,220)',
        pointHoverBorderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 10,
        data: line2.reverse(),
      },
      {
        label: line1Title,
        type: 'line',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(150, 5, 11, 0.3)',
        borderColor: 'rgb(150, 11, 2)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderWidth: 1,
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgb(150, 5, 11)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(150, 5, 11)',
        pointHoverBorderColor: 'rgb(220,220,220)',
        pointHoverBorderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 10,
        data: line1.reverse(),
      },
      {
        label: thirdLineTitle,
        fill: true,
        type: 'line',
        lineTension: 0.1,
        backgroundColor: 'rgba(80, 5, 11,0.3)',
        borderColor: 'rgb(80, 5, 11)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderWidth: 1,
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgb(80, 5, 11)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(80, 5, 11)',
        pointHoverBorderColor: 'rgb(220,220,220)',
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
      position: 'top',
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
            display: false,
            labelString: xTitle,
          },
          type: 'time',
          time: {
            unit: 'month',
            displayFormats: {
              month: 'MMM',
            },
          },
        },
      ],
    },
  }
  return (
    <Flex
      width={['100%', '100%', '70%', '70%']}
      m="1rem auto"
      flexDir="row"
      justify="center"
      maxWidth="800px"
    >
      <Line data={chartData} options={options} />
    </Flex>
  )
}
