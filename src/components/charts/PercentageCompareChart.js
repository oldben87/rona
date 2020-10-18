import React, { useState } from 'react'
import { Flex, Text, Radio, RadioGroup, Divider } from '@chakra-ui/core'
import { Line } from 'react-chartjs-2'
import moment from 'moment'

export default function PercentageCompareChart({ data }) {
  const [dayCount, setDayCount] = useState('14')
  const chartFirst30 = data.slice(0, 90)
  const dateArray = chartFirst30.map((item) => moment(item.date, 'DD/MM/YYYY'))

  const chartData = {
    labels: dateArray.slice(0, dayCount).reverse(),
    datasets: [
      {
        label: 'Tests',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(54, 167, 201,0.4)',
        borderColor: 'rgb(54, 167, 201)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderWidth: 1,
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgb(54, 167, 201)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(54, 167, 201)',
        pointHoverBorderColor: 'rgb(220,220,220)',
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
        label: 'Cases',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(66, 201, 54,0.4)',
        borderColor: 'rgb(66, 201, 54)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderWidth: 1,
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgb(66, 201, 54)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(66, 201, 54)',
        pointHoverBorderColor: 'rgb(220,220,220)',
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 10,
        data: chartFirst30
          .map((item) => item.casePercentage)
          .slice(0, dayCount)
          .reverse(),
      },
      {
        label: '7-day Cases',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(150, 50, 50,0.4)',
        borderColor: 'rgb(150, 50, 50)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderWidth: 1,
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgb(150, 50, 50)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(150, 50, 50)',
        pointHoverBorderColor: 'rgb(220,220,220)',
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 10,
        data: chartFirst30
          .map((item) => item.sevenDayCasePercentage)
          .slice(0, dayCount)
          .reverse(),
      },
      {
        label: '7-day Tests',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(150, 150, 50,0.4)',
        borderColor: 'rgb(150, 150, 50)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderWidth: 1,
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgb(150, 150, 50)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(150, 150, 50)',
        pointHoverBorderColor: 'rgb(220,220,220)',
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
      text: 'Change in case and test numbers by percentage',
      display: true,
    },
    legend: {
      position: 'bottom',
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: '% Percentage Changes',
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: `Last ${dayCount} Days`,
          },
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              month: 'DD/MM',
            },
          },
        },
      ],
    },
  }

  return (
    <>
      <Flex justify="center">
        <RadioGroup
          onChange={(e) => setDayCount(e.target.value)}
          isInline
          value={dayCount}
          spacing={5}
          style={{ alignSelf: 'center' }}
        >
          <Radio
            value="7"
            variantColor="green"
            borderColor="rgb(226, 232, 240)"
          >
            7 Days
          </Radio>
          <Radio
            value="14"
            variantColor="green"
            borderColor="rgb(226, 232, 240)"
          >
            14 Days
          </Radio>
          <Radio
            value="28"
            variantColor="green"
            borderColor="rgb(226, 232, 240)"
          >
            28 Days
          </Radio>
          <Radio
            value="90"
            variantColor="green"
            borderColor="rgb(226, 232, 240)"
          >
            90 Days
          </Radio>
        </RadioGroup>
      </Flex>
      <Line data={chartData} maintainAspectRatio={false} options={options} />
    </>
  )
}
