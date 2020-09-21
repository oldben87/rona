import Head from "next/head"
import React from "react"
import styles from "../styles/Home.module.css"
import {
  PageHeader,
  PageWrap,
  PageSection,
  PageFooter,
} from "../src/components/common"
import DayStats from "../src/components/DayStats"
import { page_header_name } from "../src/resources/strings"
import PercentageCompareChart from "../src/components/PercentageCompareChart"

export default function Home({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>COVID-19 UK Figures</title>
        <link rel="icon" href="/assets/rona2.png" />
      </Head>
      <PageHeader name={page_header_name} />
      <PageWrap>
        <PercentageCompareChart data={data} />
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <h2>Daily stats for the last 28 Days</h2>
        </div>
        <PageSection>
          {data.slice(0, 28).map((item, i) => (
            <DayStats item={item} key={i} />
          ))}
        </PageSection>
      </PageWrap>
      <PageFooter />
    </div>
  )
}

export async function getStaticProps() {
  const callRona = `${
    process.env.NODE_ENV === "production"
      ? "https://rona-olive.vercel.app"
      : "http://localhost:3000"
  }/api/hello`
  const res = await fetch(callRona)
  const response = await res.json()
  if (!response.error) {
    return {
      props: {
        data: response.data,
      },
      revalidate: 60,
    }
  }
}
