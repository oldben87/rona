import React from 'react'
import { Flex, Box } from '@chakra-ui/core'
import { Line } from 'react-chartjs-2'
import moment from 'moment'

export default function CompareChart({
  line1,
  line1Title,
  yTitle,
  line2,
  line2Title,
  dates,
  xTitle,
}) {
  const chartData = {
    labels: dates.map((item) => moment(item, 'YYYY/MM/DD')),
    datasets: [
      {
        label: line2Title,
        fill: true,
        type: 'line',
        lineTension: 0.1,
        backgroundColor: 'rgba(200, 5, 11,0.1)',
        borderColor: 'rgb(200, 5, 11)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderWidth: 2,
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgb(200, 5, 11)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 1,
        pointHoverBackgroundColor: 'rgb(200, 5, 11)',
        pointHoverBorderColor: 'rgb(220,220,220)',
        pointHoverBorderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 10,
        data: line2,
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
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(150, 5, 11)',
        pointHoverBorderColor: 'rgb(220,220,220)',
        pointHoverBorderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 10,
        data: line1,
      },
    ],
  }

  const options = {
    responsive: true,
    legend: {
      display: false,
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
      flexDir="column"
      justify="center"
      maxWidth="800px"
    >
      <Flex justify="center">
        <Flex fontSize="0.8rem" p="0.5rem" justify="center" alignItems="center">
          <Box
            h={3}
            w={6}
            border={'1px solid rgb(150, 11, 2)'}
            backgroundColor={'rgba(150, 11, 2,0.3)'}
            marginRight={2}
          ></Box>
          {line1Title}
        </Flex>
        <Flex fontSize="0.8rem" p="0.5rem" justify="center" alignItems="center">
          <Box
            h={3}
            w={6}
            border={'1px solid rgb(200, 5, 11)'}
            borderWidth={'3px'}
            backgroundColor={'rgba(200, 5, 11,0.1)'}
            marginRight={2}
          ></Box>
          {line2Title}
        </Flex>
      </Flex>
      <Line data={chartData} options={options} />
    </Flex>
  )
}
