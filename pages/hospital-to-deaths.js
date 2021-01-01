import React from 'react'
import { Flex } from '@chakra-ui/core'
import { PageLayout, PageSection, ErrorText, TextRow } from 'components/common'
import { noNulls, sevenDay, deaths, covidBeds } from 'resources/helpers'

const HospitalToDeaths = ({ data }) => {
  if (data.error) {
    return (
      <PageLayout tabTitle="COVID-19 UK Error" headerTitle="Test Page">
        <ErrorText error={data.error} />
      </PageLayout>
    )
  }
  console.log('Data [3] :', data[3])
  console.log('Data [24] :', data[24])
  return (
    <PageLayout tabTitle="COVID-19 UK NewPage" headerTitle="Test Page">
      <PageSection>
        <Flex direction="row">
          <TextRow></TextRow>
        </Flex>
      </PageSection>
    </PageLayout>
  )
}

export default HospitalToDeaths

export async function getServerSideProps() {
  const headers = new Headers()
  headers.append('Pragma', 'no-cache')
  headers.append('Cache-Control', 'no-store, must-revalidate, no-cache')
  headers.append('Expires', 0)

  const structure = {
    date: 'date',
    newDeaths: 'newDeaths28DaysByDeathDate',
    newAdmissions: 'newAdmissions',
    covidBeds: 'covidOccupiedMVBeds',
    hospitalCases: 'hospitalCases',
    newDeaths28DaysByPublishDate: 'newDeaths28DaysByPublishDate',
  }

  const uriOverview =
    'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure='

  const data = await fetch(uriOverview + JSON.stringify(structure), headers)
    .then((response) => response.json())
    .then((data) => {
      if (data.statusCode > 204 || data.data === null) {
        throw new Error('Not good status')
      }
      const response = data.data
      // reformat to populate null responses from fetch
      const noNull = response.map(noNulls)

      const result = noNull.map((obj, index) => {
        if (index < 3) {
          return {
            ...obj,
          }
        }

        const deathSevenDay = sevenDay(deaths, noNull, index)
        const covidBedSevenDay = sevenDay(covidBeds, noNull, index)

        return {
          ...obj,
          deathSevenDay: deathSevenDay.toFixed(1),
          bedSevenDay: covidBedSevenDay.toFixed(1),
        }
      })
      // send result of data
      return result
    })
    .catch(() => {
      return { error: 'Server Error' }
    })

  return {
    props: {
      data,
    },
  }
}
