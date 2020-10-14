import React from 'react'
import { Flex, Divider } from '@chakra-ui/core'
import {
  PageLayout,
  PageSection,
  ErrorText,
  TextRow,
  TitleText,
} from '../src/components/common'

const herdImmunity = ({ data }) => {
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
    <PageLayout
      tabTitle="COVID-19 UK Herd Immunity"
      headerTitle="Herd Immunity"
    >
      <PageSection background="#fff5f5">
        <Flex
          flexGrow="1"
          w={['100%', '100%', '100%', '50%']}
          direction={['column', 'column', 'column', 'row']}
        >
          <TitleText>
            What could be the impact of Herd Immunity to the UK?
          </TitleText>
        </Flex>
        <Flex
          flexGrow="1"
          w={['100%', '100%', '100%', '50%']}
          direction="column"
          p={['0.25rem', '1rem', '1.8rem', '2.4rem']}
        >
          <TextRow>
            The total of people who have been confirmed to have COVID-19 in the
            UK is {lastDay.cumCasesByPublishDate.toLocaleString()}. There have
            been {death.toLocaleString()} deaths.
          </TextRow>
          <TextRow>
            This means that {percent}% of people die who have tested positive
            for the COVID-19 Virus. At this current level there would be{' '}
            {parseInt(popDead).toLocaleString()} people dead if everyone in the
            UK contracted the virus.
          </TextRow>
        </Flex>
      </PageSection>
      <PageSection>
        <Flex
          flexGrow="1"
          w={['100%', '100%', '100%', '50%']}
          direction={['column', 'column', 'column', 'row']}
        >
          <TitleText>What is herd immunity?</TitleText>
        </Flex>
        <Flex
          flexGrow="1"
          w={['100%', '100%', '100%', '50%']}
          direction="column"
          p={['0.25rem', '1rem', '1.8rem', '2.4rem']}
        >
          <TextRow>
            Herd Immunity is the idea that a virus cannot spread to the rest of
            the population easily, if the majority of the population has been
            vaccinated against the virus. Or if there is a natural immunity
            through people contracting the virus and building up anti-bodies
            through infection.
          </TextRow>
        </Flex>
      </PageSection>
      <PageSection background="#fff5f5">
        <Flex
          flexGrow="1"
          w={['100%', '100%', '100%', '50%']}
          direction={['column', 'column', 'column', 'row']}
        >
          <TitleText>
            How much of the population needs to be immune for there to be herd
            immunity?
          </TitleText>
        </Flex>
        <Flex
          flexGrow="1"
          w={['100%', '100%', '100%', '50%']}
          direction="column"
          p={['0.25rem', '1rem', '1.8rem', '2.4rem']}
        >
          <TextRow>
            <p>
              Figures vary from as low as 43% to as high as 90%, with the higher
              number of 90% saved for viruses that are more contagious. And the
              lower figures for viruses that aren't as contagious. A general
              concensus has averaged at around 60% of our population would need
              to be immune, whether that be through a vaccine or by enough
              people contracting the virus through exposure.
            </p>
          </TextRow>
        </Flex>
      </PageSection>
    </PageLayout>
  )
}

export default herdImmunity

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
