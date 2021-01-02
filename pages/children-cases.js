import React from 'react'
import { Flex, Divider, Box } from '@chakra-ui/core'
import moment from 'moment'
import { Line } from 'react-chartjs-2'
import {
  PageLayout,
  ErrorText,
  PageSection,
  TitleText,
} from 'components/common'
import { fetchAges } from 'queries'

const Home = ({ data }) => {
  const { error } = data
  if (error) {
    return (
      <PageLayout tabTitle="COVID-19 Children" headerTitle="COVID-19 Children">
        <ErrorText error={error} />
      </PageLayout>
    )
  }

  const chartData = {
    labels: data.map((item) => moment(item.date, 'YYYY/MM/DD')),
    datasets: [
      {
        label: 'New Admissions',
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
        data: data.map((item) => item.newAdmission),
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
            labelString: 'New Admissions',
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: false,
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
    <PageLayout tabTitle="COVID-19 Children" headerTitle="COVID-19 Children">
      <PageSection flexDir="column" background="#fff5f5">
        <Flex
          alignItems="space-between"
          flexDir="column"
          w={['100%', '100%', '25%', '25%']}
        >
          <TitleText>Childrens Admissions</TitleText>
          <Divider w="75%" alignSelf="center" borderColor="red.700" />
        </Flex>
        <Flex
          width={['100%', '100%', '70%', '70%']}
          m="1rem auto"
          flexDir="column"
          justify="center"
          maxWidth="800px"
        >
          <Flex justify="center">
            <Flex
              fontSize="0.8rem"
              p="0.5rem"
              justify="center"
              alignItems="center"
            >
              <Box
                h={3}
                w={6}
                border={'1px solid rgb(200, 5, 11)'}
                borderWidth={'3px'}
                backgroundColor={'rgba(200, 5, 11,0.1)'}
                marginRight={2}
              ></Box>
              New Admissions
            </Flex>
          </Flex>
          <Line data={chartData} options={options} />
        </Flex>
      </PageSection>
    </PageLayout>
  )
}

export default Home

export async function getServerSideProps() {
  const data = await fetchAges()

  return {
    props: {
      data,
    },
  }
}
