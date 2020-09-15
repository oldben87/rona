import Head from "next/head"
import styles from "../styles/Home.module.css"
import {
  PageHeader,
  PageWrap,
  PageSection,
  PageFooter,
} from "../src/components/common"
import { page_header_name } from "../src/resources/strings"
import theme from "../styles/theme.js"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>COVID-19 UK Figures</title>
        <link rel="icon" href="/assets/rona2.png" />
      </Head>
      <PageHeader name={page_header_name} />
      <PageWrap>
        <PageSection>
          The Government is Lying to you!!! We are all going to die!
        </PageSection>
        <PageSection background={theme.colours.gray}>
          The Government is Lying to you!!! We are all going to die!
        </PageSection>
        <PageSection>
          The Government is Lying to you!!! We are all going to die!
        </PageSection>
        <PageSection background={theme.colours.gray}>
          The Government is Lying to you!!! We are all going to die!
        </PageSection>
      </PageWrap>
      <PageFooter />
    </div>
  )
}
