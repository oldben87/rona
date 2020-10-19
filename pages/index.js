import React from 'react'
import { PageLayout, ErrorText } from 'components/common'
import ChartSection from 'components/charts/ChartSection'
import ChartSectionHospital from 'components/charts/ChartSectionHospital'

const Home = ({ data }) => {
  const { error } = data
  if (error) {
    return (
      <PageLayout tabTitle="COVID-19 UK Error" headerTitle="Test Page">
        <ErrorText error={error} />
      </PageLayout>
    )
  }

  const dates = data.map((item) => item.date)
  const lastDay = data[0]
  return (
    <PageLayout tabTitle="COVID-19 UK Stats" headerTitle="COVID-19 Stats">
      <ChartSection
        chartTitle="Daily Case Numbers"
        line1={data.map((item) => item.newCases)}
        line1Title={'New Cases'}
        yTitle={'Cases'}
        line2={data.map((item) => item.caseSevenDay)}
        line2Title={'7 Day Average'}
        dates={dates}
        background="#fff5f5"
        cumStat={lastDay.cumCasesByPublishDate.toLocaleString()}
      />
      <ChartSection
        chartTitle="Daily Testing Numbers"
        line1={data.map((item) => item.newTests)}
        line1Title={'New Tests'}
        yTitle={'Tests'}
        line2={data.map((item) => item.testSevenDay)}
        line2Title={'7 Day Average'}
        dates={dates}
        cumStat={lastDay.cumTestsByPublishDate.toLocaleString()}
      />
      <ChartSection
        chartTitle="Covid-19 Death Figures"
        line1={data.map((item) => item.newDeaths)}
        line1Title={'New Deaths'}
        yTitle={'Deaths'}
        line2={data.map((item) => item.deathSevenDay)}
        line2Title={'7 Day Average'}
        dates={dates}
        background="#fff5f5"
        cumStat={lastDay.cumDeaths28DaysByPublishDate.toLocaleString()}
      />
      <ChartSectionHospital
        chartTitle="Hospitals And Healthcare"
        line1={data.map((item) => item.newAdmissions)}
        line1Title={'New Hospital Admissions'}
        yTitle={'Patients'}
        line2={data.map((item) => item.covidBeds)}
        line2Title={'Ventilator Beds'}
        thirdLine={data.map((item) => item.hospitalCases)}
        thirdLineTitle="Total In Hospital"
        dates={dates}
        cumStat={data
          .map((item) => item.cumAdmissions)
          .find((num) => num > 0)
          .toLocaleString()}
      />
    </PageLayout>
  )
}

export default Home

export async function getServerSideProps() {
  const headers = new Headers()
  headers.append('Pragma', 'no-cache')
  headers.append('Cache-Control', 'no-store, must-revalidate, no-cache')
  headers.append('Expires', 0)

  const structure = {
    date: 'date',
    newCases: 'newCasesByPublishDate',
    newTests: 'newTestsByPublishDate',
    newDeaths: 'newDeaths28DaysByPublishDate',
    newAdmissions: 'newAdmissions',
    covidBeds: 'covidOccupiedMVBeds',
    hospitalCases: 'hospitalCases',
    cumCasesByPublishDate: 'cumCasesByPublishDate',
    cumDeaths28DaysByPublishDate: 'cumDeaths28DaysByPublishDate',
    cumAdmissions: 'cumAdmissions',
    cumTestsByPublishDate: 'cumTestsByPublishDate',
  }
  const uri =
    'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure='

  const res = await fetch(uri + JSON.stringify(structure), headers)
    .then((response) => response.json())
    .then((data) => {
      if (data.statusCode > 204 || data.data === null) {
        throw new Error('Not good status')
      }
      const response = data.data
      // reformat to populate null responses from fetch
      const noNull = response.map((item) => {
        let result_no_null = {
          date: item.date.split('-').reverse().join('-'),
          newCases: item.newCases || 0,
          newTests: item.newTests || 0,
          newDeaths: item.newDeaths || 0,
          newAdmissions: item.newAdmissions || 0,
          covidBeds: item.covidBeds || 0,
          hospitalCases: item.hospitalCases || 0,
          cumCasesByPublishDate: item.cumCasesByPublishDate || 0,
          cumDeaths28DaysByPublishDate: item.cumDeaths28DaysByPublishDate || 0,
          cumAdmissions: item.cumAdmissions || 0,
          cumTestsByPublishDate: item.cumTestsByPublishDate || 0,
        }
        return result_no_null
      })
      // calculate difference in days and add to reponse
      const result = noNull.map((fill, index) => {
        const testSevenDay =
          noNull
            .slice(index - 3, index + 3)
            .map(tests)
            .reduce((a, b) => a + b, 0) / 7

        const caseSevenDay =
          noNull
            .slice(index - 3, index + 3)
            .map(cases)
            .reduce((a, b) => a + b, 0) / 7

        const deathSevenDay =
          noNull
            .slice(index - 3, index + 3)
            .map(deaths)
            .reduce((a, b) => a + b, 0) / 7

        if (index < 3) {
          return {
            ...fill,
          }
        } else {
          return {
            ...fill,
            testSevenDay: testSevenDay.toFixed(1),
            caseSevenDay: caseSevenDay.toFixed(1),
            deathSevenDay: deathSevenDay.toFixed(1),
          }
        }
      })
      // send result of data
      return result
    })
    .catch(() => {
      return { error: 'Server Error Nation' }
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

function deaths(item) {
  return item.newDeaths
}
