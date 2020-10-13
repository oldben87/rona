import React from 'react'
import { Flex } from '@chakra-ui/core'
import {
  PageLayout,
  PageSection,
  ErrorText,
  TextRow,
} from '../src/components/common'

const deathPercentage = ({ data }) => {
  const { error } = data
  if (error) {
    return (
      <PageLayout tabTitle="COVID-19 UK Error" headerTitle="Test Page">
        <ErrorText error={error} />
      </PageLayout>
    )
  }

  const lastDay = data[0]
  const death =
    lastDay.cumDeaths28DaysByDeathDate ||
    data.map(deaths).reduce((a, b) => a + b)
  const percent = ((death / lastDay.cumCasesByPublishDate) * 100).toFixed(2)
  const popDead = ((67886011 / 100) * percent).toFixed(0)

  return (
    <PageLayout tabTitle="COVID-19 UK NewPage" headerTitle="Test Page">
      <PageSection>
        <TextRow>
          <p>{lastDay.cumCasesByPublishDate.toLocaleString()}</p>
        </TextRow>
        <TextRow>
          <p>{death.toLocaleString()}</p>
        </TextRow>
        <TextRow>
          <p>{((death / lastDay.cumCasesByPublishDate) * 100).toFixed(2)}%</p>
        </TextRow>
        <TextRow>
          <p>
            Currently {percent}% of people die who have tested positive for the
            COVID-19 Virus. If there was to be a herd immunity attempt in the
            UK, at this current level there would be{' '}
            {parseInt(popDead).toLocaleString()} People Dead if everyone in the
            UK contracted the virus.
          </p>
        </TextRow>
      </PageSection>
    </PageLayout>
  )
}

export default deathPercentage

export async function getServerSideProps() {
  const headers = new Headers()
  headers.append('Pragma', 'no-cache')
  headers.append('Cache-Control', 'no-store, must-revalidate, no-cache')
  headers.append('Expires', 0)

  const structure = {
    date: 'date',
    cumCasesByPublishDate: 'cumCasesByPublishDate',
    cumDeaths28DaysByDeathDate: 'cumDeaths28DaysByDeathDate',
    newDeaths: 'newDeaths28DaysByPublishDate',
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
        }
        return result_no_null
      })
      return noNull
    })
    .catch(() => {
      return { error: 'Server Error: unable to fetch' }
    })

  return {
    props: {
      data: overview,
    },
  }
}

function deaths(item) {
  return item.newDeaths
}
