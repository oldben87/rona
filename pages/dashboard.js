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
                main={data.map((item) => item.newCases)}
                baseLine={data.map((item) => item.caseSevenDay)}
                mainTitle={"New Cases"}
                baseLineTitle={"7 Day Cases"}
                dates={data.map((item) => item.date)}
                title={"Cases Over The Year"}
                xTitle={"Date"}
                yTitle={"Cases"}
              />
            </PageSection>
            <PageSection>
              <MixedChart
                main={data.map((item) => item.newTests)}
                baseLine={data.map((item) => item.testSevenDay)}
                mainTitle={"New Tests"}
                baseLineTitle={"7 Day Tests"}
                dates={data.map((item) => item.date)}
                title={"Testing Over The Year"}
                xTitle={"Date"}
                yTitle={"Tests"}
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
