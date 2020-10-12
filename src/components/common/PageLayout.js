import Head from "next/head"
import React from "react"
import styles from "../../../styles/Home.module.css"
import { PageHeader, PageWrap, PageFooter } from "../common"

export const PageLayout = ({ children, tabTitle, headerTitle }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{tabTitle}</title>
        <link rel="icon" href="/assets/rona2.png" />
      </Head>
      <PageHeader name={headerTitle} />
      <PageWrap>{children}</PageWrap>
      <PageFooter />
    </div>
  )
}
