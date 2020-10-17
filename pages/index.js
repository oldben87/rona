import React from 'react'
import fetch from 'isomorphic-unfetch'
import { PageLayout, ErrorText } from 'components/common'
import ChartSection from 'components/Dashboard/ChartSection'

const Home = ({ data }) => {
  const { error } = data

  const dates = !data.error ? data.map((item) => item.date) : null
  return (
    <PageLayout tabTitle="COVID-19 UK Stats" headerTitle="COVID-19 Stats">
      {error ? (
        <ErrorText error={error} />
      ) : (
        <>
          <ChartSection
            chartTitle="Daily Case Numbers"
            line1={data.map((item) => item.newCases)}
            line1Title={'New Cases'}
            yTitle={'Cases'}
            line2={data.map((item) => item.caseSevenDay)}
            line2Title={'7 Day Average'}
            dates={dates}
            background="#fff5f5"
          />
          <ChartSection
            chartTitle="Daily Testing Numbers"
            line1={data.map((item) => item.newTests)}
            line1Title={'New Tests'}
            yTitle={'Tests'}
            line2={data.map((item) => item.testSevenDay)}
            line2Title={'7 Day Average'}
            dates={dates}
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
          />
          <ChartSection
            chartTitle="Hospitals And Healthcare"
            line1={data.map((item) => item.newAdmissions)}
            line1Title={'New Hospital Admissions'}
            yTitle={'Patients'}
            line2={data.map((item) => item.covidBeds)}
            line2Title={'Ventilator Beds'}
            thirdLine={data.map((item) => item.hospitalCases)}
            thirdLineTitle="Total In Hospital"
            dates={dates}
          />
        </>
      )}
    </PageLayout>
  )
}

export default Home

export async function getServerSideProps() {
  const headers = new Headers()
  headers.append('Pragma', 'no-cache')
  headers.append('Cache-Control', 'no-store, must-revalidate, no-cache')
  headers.append('Expires', 0)

  const uri = `${
    process.env.NODE_ENV === 'production'
      ? 'https://rona-olive.vercel.app'
      : 'http://localhost:3000'
  }/api/dashboard`

  const res = await fetch(uri, headers)
  const response = await res.json()

  return {
    props: {
      data: response.data,
    },
  }
}
