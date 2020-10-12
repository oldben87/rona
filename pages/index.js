import React from "react"
import fetch from "isomorphic-unfetch"
import {
  PageLayout,
  ErrorText,
} from "../src/components/common"
import ChartSection from "../src/components/Dashboard/ChartSection"

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
              main={data.map((item) => item.newCases)}
              mainTitle={"New Cases"}
              yTitle={"Cases"}
              baseLine={data.map((item) => item.caseSevenDay)}
              baseLineTitle={"7 Day Average"}
              dates={dates}
              background="#fff5f5"
            />
            <ChartSection
              chartTitle="Daily Testing Numbers"
              main={data.map((item) => item.newTests)}
              mainTitle={"New Tests"}
              yTitle={"Tests"}
              baseLine={data.map((item) => item.testSevenDay)}
              baseLineTitle={"7 Day Average"}
              dates={dates}
            />
            <ChartSection
              chartTitle="Covid-19 Death Figures"
              main={data.map((item) => item.newDeaths)}
              mainTitle={"New Deaths"}
              yTitle={"Deaths"}
              baseLine={data.map((item) => item.deathSevenDay)}
              baseLineTitle={"7 Day Average"}
              dates={dates}
              background="⁴"
            />
            <ChartSection
              chartTitle="Hospitals And Healthcare"
              main={data.map((item) => item.newAdmissions)}
              mainTitle={"New Hospital Admissions"}
              yTitle={"Patients"}
              baseLine={data.map((item) => item.covidBeds)}
              baseLineTitle={"Ventilator Beds"}
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
  headers.append("Pragma", "no-cache")
  headers.append("Cache-Control", "no-store, must-revalidate, no-cache")
  headers.append("Expires", 0)

  const uri = `${
    process.env.NODE_ENV === "production"
      ? "https://rona-olive.vercel.app"
      : "http://localhost:3000"
  }/api/dashboard`

  const res = await fetch(uri, headers)
  const response = await res.json()

  return {
    props: {
      data: response.data,
    },
  }
}
