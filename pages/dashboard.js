import Head from "next/head"
import React from "react"
import fetch from "isomorphic-unfetch"
import styles from "../styles/Home.module.css"
import {
  PageHeader,
  PageWrap,
  PageSection,
  PageFooter,
} from "../src/components/common"
import MixedChart from "../src/components/MixedChart"

const Home = ({ data }) => {
  const { error } = data
  return (
    <div className={styles.container}>
      <Head>
        <title>COVID-19 UK Figures</title>
        <link rel="icon" href="/assets/rona2.png" />
      </Head>
      <PageHeader name="Covis Stats" />
      <PageWrap>
        {error ? (
          <p>Error Loading Page Data </p>
        ) : (
          <>
            <PageSection>
              <MixedChart
                bar={data.map((item) => item.newCases)}
                line={data.map((item) => item.caseSevenDay)}
                barTitle={"New Cases"}
                lineTitle={"7 Day Cases"}
                dates={data.map((item) => item.date)}
                title={"Cases Over The Year"}
                xTitle={"Dates"}
                ytitle={"Cases"}
              />
            </PageSection>
          </>
        )}
      </PageWrap>
      <PageFooter />
    </div>
  )
}

export default Home

export async function getServerSideProps() {
  const callRona = `${
    process.env.NODE_ENV === "production"
      ? "https://rona-olive.vercel.app"
      : "http://localhost:3000"
  }/api/dashboard`
  const res = await fetch(callRona)
  const response = await res.json()

  return {
    props: {
      data: response.data,
    },
  }
}
