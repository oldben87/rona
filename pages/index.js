import Head from "next/head"
import React from "react"
import styles from "../styles/Home.module.css"
import {
  PageHeader,
  PageWrap,
  PageSection,
  PageFooter,
} from "../src/components/common"
import { page_header_name } from "../src/resources/strings"
import theme from "../styles/theme"

export default function Home({ data }) {
  let colour = false

  return (
    <div className={styles.container}>
      <Head>
        <title>COVID-19 UK Figures</title>
        <link rel="icon" href="/assets/rona2.png" />
      </Head>
      <PageHeader name={page_header_name} />
      <PageWrap>
        {data.map((item, i) => {
          colour = !colour
          return (
            <PageSection
              key={i}
              background={colour ? "white" : theme.colours.gray}
            >
              {item.date ? <p>{item.date}</p> : null}
              {item.newCases ? (
                <p>New Cases in last 24 hours: {item.newCases}</p>
              ) : null}
              {item.caseChange ? (
                <p>
                  Change in cases from previous day: {item.caseChange}{" "}
                  {item.casePercentage}%
                </p>
              ) : null}
              {item.newTests ? (
                <p>Tests in last 24 hours: {item.newTests}</p>
              ) : null}
              {item.testChange ? (
                <p>
                  Change in tests number from previous day: {item.testChange}{" "}
                  {item.testPercentage}%
                </p>
              ) : null}
            </PageSection>
          )
        })}
      </PageWrap>
      <PageFooter />
    </div>
  )
}

export async function getStaticProps() {
  const callRona = "http://localhost:3000/api/hello"
  const res = await fetch(callRona)
  const response = await res.json()
  return {
    props: {
      data: response.data,
    },
  }
}
