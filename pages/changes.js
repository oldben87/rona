import React from 'react'
import fetch from 'isomorphic-unfetch'
import { Flex, Text, Divider } from '@chakra-ui/core'
import {
  PageLayout,
  PageSection,
  ErrorText,
  TitleText,
} from 'components/common'
import DayStats from 'components/DayStats'
import { page_header_name } from 'resources/strings'
import PercentageCompareChart from 'components/charts/PercentageCompareChart'

const Changes = ({ data }) => {
  const { error } = data
  return (
    <PageLayout tabTitle="COVID-19 UK Questions" headerTitle={page_header_name}>
      {error ? (
        <ErrorText error={error} />
      ) : (
        <>
          <PageSection background="#fff5f5" flexDir="column" color="dimgray">
            <TitleText>
              Does the change in new cases reflect the change in the number of
              tests?
            </TitleText>
            <Text fontStyle="italic" color="dimgray">
              I have been hearing a lot lately, that the rise in COVID-19 cases
              in the UK can be attributed to the rise in testing numbers. I
              hadn't really seen any data supporting this theory so thought I
              would attempt to find an answer to that statement.
            </Text>
            <Divider width={'75%'} alignSelf="center" color="red.800" />
            <Text padding="0.4rem" color="dimgray">
              This chart aims to show the change in the new number of COVID-19
              cases in the UK, compared to the change in the new number of tests
              completed in a 24 hour period.
            </Text>
            <Text padding="0.4rem" color="dimgray">
              This is done by showing what percentage have these figures changed
              compared to the day before. The green line shows the cases, and
              the blue shows the tests. It also shows the average for the last 7
              days in the cases and tests, the Red and Yellow lines.
            </Text>
            <Text padding="0.4rem" color="dimgray">
              If the lines follow each other and are close together, then the
              change in numbers can be seen to reflect each other, so a 10%
              increase in tests causes a 10% increase in new cases.
            </Text>
            <Text padding="0.4rem" color="dimgray">
              If there are significantly higher spikes on the green line
              compared to the blue line. This indicates that there has been an
              increase in cases that is not directly related to a change in
              testing numbers. The same is true for the opposite, spikes on the
              blue line would indicate that more testing has been done, but has
              not drastically increased the number of cases.
            </Text>
          </PageSection>
          <PageSection>
            <PercentageCompareChart data={data} />
          </PageSection>
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
            }}
          ></div>
          <PageSection>
            <Text style={{ marginTop: '1rem' }}>
              If this chart is showing all the lines close together, then case
              numbers and test numbers will be following a similar trend, and it
              is likely any change in case number is due in part to the change
              in testing figures. Seeing a higher percentage of cases compared
              to tests is a worry, so if the green and red lines are constantly
              higher than the blue and yellow lines, then this is a cause for
              concern. Ideally if the UK is doing well against the spread of the
              COVID virus, we would see the Blue and Yellow lines higher then
              the 0 percentile line, and the Red and Green line consistently
              below the 0 percentile line
            </Text>
            <Text style={{ margin: '1rem 0' }}>
              This data needs to be taken in consideration with other factors.
              For example, a 100% increase in cases could indicate a big jump,
              but if that is from 1 case to 2 cases, this is obviously not a big
              jump. So this chart alone does not provide a complete picture.
            </Text>
          </PageSection>
          <PageSection background="#fff5f5" flexDir="column">
            <Text as="h2" p={2} fontSize="3xl" color="red.800">
              Daily stats for the last 28 Days
            </Text>
            <Flex overflow="auto">
              {data.slice(0, 28).map((item, i) => (
                <DayStats item={item} key={i} />
              ))}
            </Flex>
          </PageSection>
        </>
      )}
    </PageLayout>
  )
}

export default Changes

export async function getServerSideProps() {
  const headers = new Headers()
  headers.append('Pragma', 'no-cache')
  headers.append('Cache-Control', 'no-store, must-revalidate, no-cache')
  headers.append('Expires', 0)

  const structure = {
    date: 'date',
    newCases: 'newCasesByPublishDate',
    newTests: 'newTestsByPublishDate',
  }

  const uri =
    'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure='

  const res = await fetch(uri + JSON.stringify(structure), headers)
    .then((response) => response.json())
    .then((data) => {
      if (data.statusCode > 204 || data.data === null) {
        console.log('Error Thrown')
        throw new Error('Not good status')
      }

      const response = data.data
      // reformat to populate null responses from fetch
      const noNull = response.map((item) => {
        let result_no_null = {
          date: item.date.split('-').reverse().join('-'),
          newCases: item.newCases || 0,
          newTests: item.newTests || 0,
        }
        return result_no_null
      })
      // calculate difference in days and add to reponse

      const result = noNull.map((fill, index) => {
        const slice = noNull.slice(index, index + 2)
        const new_tests = slice.map(tests)
        const new_cases = slice.map(cases)

        const testChange = new_tests.reduce((a, b) => a - b)
        const caseChange = new_cases.reduce((a, b) => a - b)

        const testPercentage = ((testChange / new_tests[1]) * 100).toFixed(1)
        const casePercentage = ((caseChange / new_cases[1]) * 100).toFixed(1)

        const testSevenDay =
          noNull
            .slice(index - 3, index + 3)
            .map(tests)
            .reduce((a, b) => a + b, 0) / 7

        const testSevenDaySlice = noNull.slice(index - 2, index + 4)
        const sevenDay2 = (
          testSevenDaySlice.map(tests).reduce((a, b) => a + b, 0) / 7
        ).toFixed(1)

        const sevenDayTestPercentage =
          ((testSevenDay - sevenDay2) / sevenDay2) * 100

        const caseSevenDay =
          noNull
            .slice(index, index + 7)
            .map(cases)
            .reduce((a, b) => a + b) / 7

        const sevenDay3 = (
          testSevenDaySlice.map(cases).reduce((a, b) => a + b, 0) / 7
        ).toFixed(1)

        const sevenDayCasePercentage =
          ((caseSevenDay - sevenDay3) / sevenDay3) * 100

        if (
          !sevenDayTestPercentage ||
          sevenDayTestPercentage === Infinity ||
          sevenDayTestPercentage === -100
        ) {
          return {
            ...fill,
            testChange,
            caseChange,
            testPercentage,
            casePercentage,
          }
        } else {
          return {
            ...fill,
            testChange,
            caseChange,
            testPercentage,
            casePercentage,
            testSevenDay: testSevenDay.toFixed(1),
            caseSevenDay: caseSevenDay.toFixed(1),
            sevenDayTestPercentage: sevenDayTestPercentage.toFixed(1),
            sevenDayCasePercentage: sevenDayCasePercentage.toFixed(1),
          }
        }
      })

      return result
    })
    .catch(() => {
      return { error: 'Unable to retrieve data' }
    })

  return {
    props: {
      data: res,
    },
  }
}

function cases(item) {
  return item.newCases
}

function tests(item) {
  return item.newTests
}
