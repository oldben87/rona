import React from "react"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import Link from "next/link"
import {
  PageHeader,
  PageWrap,
  PageSection,
  PageFooter,
} from "../src/components/common"

export default function questions() {
  return (
    <div className={styles.container}>
      <Head>
        <title>COVID-19 UK Questions</title>
        <link rel="icon" href="/assets/rona2.png" />
      </Head>
      <PageHeader name="Questions about COVID" />
      <PageWrap>
        <PageSection background="rgba(0,0,0,0.05)" justify="start">
          <Link href="/changes" passHref>
            <a>
              Does the change in new cases reflect the change in the number of
              tests?
            </a>
          </Link>
        </PageSection>
        <PageSection justify="start">
          <Link href="/casestotests" passHref>
            <a>What is the current percentage of cases to tests?</a>
          </Link>
        </PageSection>
      </PageWrap>
      <PageFooter />
    </div>
  )
}
