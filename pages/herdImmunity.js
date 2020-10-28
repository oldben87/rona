import React from 'react'
import { Flex, Text } from '@chakra-ui/core'

import {
  PageLayout,
  PageSection,
  ErrorText,
  TextRow,
  TitleText,
} from 'components/common'
import SimpleTable from 'components/SimpleTable'
import { fetchImmunity } from 'queries'

const herdImmunity = ({ data }) => {
  const { error } = data
  if (error) {
    return (
      <PageLayout
        tabTitle="COVID-19 UK Herd Immunity"
        headerTitle="Herd Immunity"
      >
        <ErrorText error={error} />
      </PageLayout>
    )
  }
  const population = 67886011
  const lastDay = data[0]
  const death =
    lastDay.cumDeaths28DaysByPublishDate ||
    data.map(deaths).reduce((a, b) => a + b)
  const percent = ((death / lastDay.cumCasesByPublishDate) * 100).toFixed(2)
  const popDead = ((population / 100) * percent).toFixed(0)
  const admissionsArray = data.map((item) => item.cumAdmissions)
  const hospCases = admissionsArray.find((val) => val > 0)
  const mildCases = lastDay.cumCasesByPublishDate - hospCases
  const hospPercent = mildCases / lastDay.cumCasesByPublishDate
  const longCovid = (hospPercent * population) / 10
  const total = longCovid + parseInt(popDead)

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
      <PageSection>
        <Flex
          flexGrow="1"
          w={['100%', '100%', '100%', '50%']}
          direction="column"
          p={['0.25rem', '1rem', '1.8rem', '2.4rem']}
        >
          <TitleText size="xl">
            What could be the impact of Herd Immunity to the UK?
          </TitleText>
          <Flex direction="column ">
            <TextRow>
              The total of people who have been confirmed to have COVID-19 in
              the UK is {lastDay.cumCasesByPublishDate.toLocaleString()}. There
              have been {death.toLocaleString()} deaths.
            </TextRow>
            <TextRow>
              This means that {percent}% of people die who have tested positive
              for the COVID-19 Virus. At this current level there would be{' '}
              {parseInt(popDead).toLocaleString()} people dead if everyone in
              the UK contracted the virus.
            </TextRow>
          </Flex>
        </Flex>
        <Flex
          flexGrow="1"
          w={['100%', '100%', '100%', '50%']}
          direction="column"
          p={['0.25rem', '1rem', '1.8rem', '2.4rem']}
        >
          <TitleText size="xl">
            How much of the population needs to be immune for there to be herd
            immunity?
          </TitleText>
          <TextRow>
            <Text>
              Figures vary from as low as 43% to as high as 90%, with the higher
              number of 90% saved for viruses that are more contagious. And the
              lower figures for viruses that aren't as contagious. A general
              concensus has averaged at around 60% of our population would need
              to be immune, whether that be through a vaccine or by enough
              people contracting the virus through exposure.
            </Text>
          </TextRow>
        </Flex>
      </PageSection>
      <PageSection background="#fff5f5" direction="column">
        <Flex
          flexGrow="1"
          w={['100%', '100%', '100%', '50%']}
          direction={['column', 'column', 'column', 'row']}
        >
          <TitleText size="2xl">
            How many deaths could there be if we reach the immunity number
            without a vaccine?
          </TitleText>
        </Flex>
        <SimpleTable
          colTitle1="Herd Percentage"
          colTitle2="People Dead"
          maxNum={popDead}
        />
      </PageSection>
      <PageSection direction="column">
        <Flex
          flexGrow="1"
          w={['100%', '100%', '100%', '50%']}
          direction={['column', 'column', 'column', 'row']}
        >
          <TitleText size="2xl">
            How many would suffer with 'Long-Covid' symptoms if we followed a
            Herd Immunity policy?
          </TitleText>
          <TextRow>
            <Text>
              There is evidence to suggest that 10% of mild cases of Covid, end
              up developing long term debilitating symptoms of the virus. To
              find this number of people, we can take the cases of covid{' '}
              {lastDay.cumCasesByPublishDate.toLocaleString()}, and remove the
              number of people who have been admitted to hospital{' '}
              {hospCases.toLocaleString()}. This gives us{' '}
              {mildCases.toLocaleString()} mild cases. Which would indicate that{' '}
              {Math.floor(mildCases / 10).toLocaleString()} people will be
              suffering from Long Covid. We can calculate that this is{' '}
              {(hospPercent * 10).toFixed(2)}% of cases.
            </Text>
          </TextRow>
        </Flex>
      </PageSection>
      <PageSection background="#fff5f5" direction="column">
        <Flex
          flexGrow="1"
          w={['100%', '100%', '100%', '50%']}
          direction={['column', 'column', 'column', 'row']}
        >
          <TitleText size="2xl">
            How many mild cases could develop Long Covid symptoms if we try to
            reach herd immunity without a vaccine?
          </TitleText>
        </Flex>
        <SimpleTable
          colTitle1="Herd Percentage"
          colTitle2="Long Covid No#"
          maxNum={longCovid}
        />
      </PageSection>
      <PageSection direction="column">
        <Flex
          flexGrow="1"
          w={['100%', '100%', '100%', '50%']}
          direction={['column', 'column', 'column', 'row']}
        >
          <TitleText size="2xl">
            What would be the total number of people either killed or severly
            affected by a herd immunity policy?
          </TitleText>
        </Flex>
        <SimpleTable
          colTitle1="Herd Percentage"
          colTitle2="Total Affected"
          maxNum={total}
        />
      </PageSection>
    </PageLayout>
  )
}

export default herdImmunity

export async function getServerSideProps() {
  const data = await fetchImmunity()

  return {
    props: {
      data,
    },
  }
}

function deaths(item) {
  return item.newDeaths
}
