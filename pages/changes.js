import Head from "next/head"
import React from "react"
import fetch from "isomorphic-unfetch"
import styles from "../styles/Home.module.css"
import {
  PageHeader,
  PageWrap,
  PageSection,
  PageFooter,
  ErrorText,
} from "../src/components/common"
import DayStats from "../src/components/DayStats"
import { page_header_name } from "../src/resources/strings"
import PercentageCompareChart from "../src/components/PercentageCompareChart"

const Changes = ({ data }) => {
  const { error } = data
  return (
    <div className={styles.container}>
      <Head>
        <title>COVID-19 UK Questions</title>
        <link rel="icon" href="/assets/rona2.png" />
      </Head>
      <PageHeader name={page_header_name} />
      <PageWrap>
        {error ? (
          <ErrorText error={error} />
        ) : (
          <>
            <PercentageCompareChart data={data} />

            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <h2>Daily stats for the last 28 Days</h2>
            </div>
            <PageSection>
              {data.slice(0, 28).map((item, i) => (
                <DayStats item={item} key={i} />
              ))}
            </PageSection>
          </>
        )}
      </PageWrap>
      <PageFooter />
    </div>
  )
}

export default Changes

export async function getServerSideProps() {
  const headers = new Headers()
  headers.append("Pragma", "no-cache")
  headers.append("Cache-Control", "no-store, must-revalidate, no-cache")
  headers.append("Expires", 0)

  const uri = `${
    process.env.NODE_ENV === "production"
      ? "https://rona-olive.vercel.app"
      : "http://localhost:3000"
  }/api/overview`

  const res = await fetch(uri, headers)
  const response = await res.json()

  return {
    props: {
      data: response.data,
    },
  }
}
