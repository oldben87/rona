import React from 'react'

import { PageLayout, ErrorText } from 'components/common'
import ChartSection from 'components/charts/ChartSection'
import ChartSectionHospital from 'components/charts/ChartSectionHospital'
import { fetchHome } from 'queries'

const Home = ({ data }) => {
  const { error } = data
  if (error) {
    return (
      <PageLayout tabTitle="COVID-19 UK Stats" headerTitle="COVID-19 Stats">
        <ErrorText error={error} />
      </PageLayout>
    )
  }

  const dates = data.map((item) => item.date)
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
        cumStat={data
          .map((item) => item.cumCasesByPublishDate)
          .find((num) => num > 0)
          .toLocaleString()}
      />
      <ChartSection
        chartTitle="Daily Testing Numbers"
        line1={data.map((item) => item.newTests)}
        line1Title={'New Tests'}
        yTitle={'Tests'}
        line2={data.map((item) => item.testSevenDay)}
        line2Title={'7 Day Average'}
        dates={dates}
        cumStat={data
          .map((item) => item.cumTestsByPublishDate)
          .find((num) => num > 0)
          .toLocaleString()}
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
        cumStat={data
          .map((item) => item.cumDeaths28DaysByPublishDate)
          .find((num) => num > 0)
          .toLocaleString()}
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
  const data = await fetchHome()

  return {
    props: {
      data,
    },
  }
}
