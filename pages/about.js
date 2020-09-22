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

export default function about() {
  return (
    <div className={styles.container}>
      <Head>
        <title>COVID-19 UK Figures</title>
        <link rel="icon" href="/assets/rona2.png" />
      </Head>
      <PageHeader name={page_header_name} />
      <PageWrap>
        <PageSection>
          <p>Abooot</p>
        </PageSection>
      </PageWrap>
      <PageFooter />
    </div>
  )
}
