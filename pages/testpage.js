import React from 'react'
import { Flex } from '@chakra-ui/core'
import { PageLayout, PageSection, ErrorText } from 'components/common'
import Everything from 'components/Everything'

const NewPage = ({ overview, nation }) => {
  if (overview.error || nation.error) {
    return (
      <PageLayout tabTitle="COVID-19 UK Error" headerTitle="Test Page">
        <ErrorText error={overview.error || nation.error} />
      </PageLayout>
    )
  }

  return (
    <PageLayout tabTitle="COVID-19 UK NewPage" headerTitle="Test Page">
      <PageSection>
        <Flex direction="row">
          <Everything item={overview[4]} title="Overview" />
          <Everything item={nation[4]} title="Nation" />
        </Flex>
      </PageSection>
    </PageLayout>
  )
}

export default NewPage

export async function getServerSideProps() {
  const headers = new Headers()
  headers.append('Pragma', 'no-cache')
  headers.append('Cache-Control', 'no-store, must-revalidate, no-cache')
  headers.append('Expires', 0)

  const structure = {
    date: 'date',
    newCases: 'newCasesByPublishDate',
    newTests: 'newTestsByPublishDate',
    newDeaths: 'newDeaths28DaysByDeathDate',
    newAdmissions: 'newAdmissions',
    cumAdmissions: 'cumAdmissions',
    covidBeds: 'covidOccupiedMVBeds',
    hospitalCases: 'hospitalCases',
    cumCasesByPublishDate: 'cumCasesByPublishDate',
    cumCasesBySpecimenDateRate: 'cumCasesBySpecimenDateRate',
    newCasesBySpecimenDate: 'newCasesBySpecimenDate',
    maleCases: 'maleCases',
    femaleCases: 'femaleCases',
    newPillarOneTestsByPublishDate: 'newPillarOneTestsByPublishDate',
    cumPillarOneTestsByPublishDate: 'cumPillarOneTestsByPublishDate',
    newPillarTwoTestsByPublishDate: 'newPillarTwoTestsByPublishDate',
    cumPillarTwoTestsByPublishDate: 'cumPillarTwoTestsByPublishDate',
    newPillarThreeTestsByPublishDate: 'newPillarThreeTestsByPublishDate',
    cumPillarThreeTestsByPublishDate: 'cumPillarThreeTestsByPublishDate',
    newPillarFourTestsByPublishDate: 'newPillarFourTestsByPublishDate',
    cumPillarFourTestsByPublishDate: 'cumPillarFourTestsByPublishDate',
    cumAdmissionsByAge: 'cumAdmissionsByAge',
    cumTestsByPublishDate: 'cumTestsByPublishDate',
    plannedCapacityByPublishDate: 'plannedCapacityByPublishDate',
    newDeaths28DaysByPublishDate: 'newDeaths28DaysByPublishDate',
    cumDeaths28DaysByPublishDate: 'cumDeaths28DaysByPublishDate',
    cumDeaths28DaysByPublishDateRate: 'cumDeaths28DaysByPublishDateRate',
    newDeaths28DaysByDeathDate: 'newDeaths28DaysByDeathDate',
    cumDeaths28DaysByDeathDate: 'cumDeaths28DaysByDeathDate',
    cumDeaths28DaysByDeathDateRate: 'cumDeaths28DaysByDeathDateRate',
  }

  const uriOverview =
    'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure='

  const overview = await fetch(uriOverview + JSON.stringify(structure), headers)
    .then((response) => response.json())
    .then((data) => {
      if (data.statusCode > 204 || data.data === null) {
        throw new Error('Not good status')
      }
      const response = data.data
      // reformat to populate null responses from fetch
      const noNull = response.map((item) => {
        let result_no_null = {
          ...item,
          date: item.date.split('-').reverse().join('-'),
          newCases: item.newCases || 0,
          newTests: item.newTests || 0,
          newDeaths: item.newDeaths || 0,
          newAdmissions: item.newAdmissions || 0,
          covidBeds: item.covidBeds || 0,
          hospitalCases: item.hospitalCases || 0,
        }
        return result_no_null
      })
      return noNull
    })
    .catch(() => {
      return { error: 'Server Error Overvire' }
    })

  const uriNation =
    'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure='

  const nation = await fetch(uriNation + JSON.stringify(structure), headers)
    .then((response) => response.json())
    .then((data) => {
      if (data.statusCode > 204 || data.data === null) {
        throw new Error('Not good status')
      }
      const response = data.data
      // reformat to populate null responses from fetch
      const noNull = response.map((item) => {
        let result_no_null = {
          ...item,
          date: item.date.split('-').reverse().join('-'),
          newCases: item.newCases || 0,
          newTests: item.newTests || 0,
          newDeaths: item.newDeaths || 0,
          newAdmissions: item.newAdmissions || 0,
          covidBeds: item.covidBeds || 0,
          hospitalCases: item.hospitalCases || 0,
        }
        return result_no_null
      })
      return noNull
    })
    .catch(() => {
      return { error: 'Server Error Nation' }
    })

  return {
    props: {
      overview,
      nation,
    },
  }
}
