import Head from "next/head"
import React from "react"
import fetch from "isomorphic-unfetch"
import styles from "../styles/Home.module.css"
import { Text, Flex, Divider } from "@chakra-ui/core"
import {
  PageHeader,
  PageWrap,
  PageSection,
  PageFooter,
} from "../src/components/common"
import CompareChart from "../src/components/CompareChart"
import ChartSection from "../src/components/Dashboard/ChartSection"

const Home = ({ data }) => {
  const { error } = data
  const dates = data.map((item) => item.date)
  return (
    <div className={styles.container}>
      <Head>
        <title>COVID-19 UK Figures</title>
        <link rel="icon" href="/assets/rona2.png" />
      </Head>
      <PageHeader name="Covid-19 Stats" />
      <PageWrap>
        {error ? (
          <p>{error}</p>
        ) : (
          <>
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
              chartTitle="Daily Case Numbers"
              main={data.map((item) => item.newCases)}
              mainTitle={"New Cases"}
              yTitle={"Cases"}
              baseLine={data.map((item) => item.caseSevenDay)}
              baseLineTitle={"7 Day Average"}
              dates={dates}
              background="rgba(0,0,0,0.1)"
            />
            <ChartSection
              chartTitle="Covid-19 Death Numbers"
              main={data.map((item) => item.newDeaths)}
              mainTitle={"New Deaths"}
              yTitle={"Deaths"}
              baseLine={data.map((item) => item.deathSevenDay)}
              baseLineTitle={"7 Day Average"}
              dates={dates}
            />
            <PageSection background="rgba(0,0,0,0.1)">
              <Flex w="100%" flexDir="column">
                <Text as="h2" alignSelf="center">
                  Daily Hospital Numbers
                </Text>
                <Flex justify="space-between" w="100%">
                  <Text>
                    Most Recent:{" "}
                    {data[2].newAdmissions !== 0
                      ? data[2].newAdmissions.toLocaleString()
                      : "No Data"}
                  </Text>
                  <Text>
                    Total Admissions:{" "}
                    {data
                      .map((item) => item.newAdmissions)
                      .reduce((a, b) => a + b)
                      .toLocaleString()}
                  </Text>
                </Flex>
              </Flex>
              <CompareChart
                main={data.map((item) => item.hospitalCases)}
                baseLine={data.map((item) => item.covidBeds)}
                mainTitle={"New Hospital Cases"}
                baseLineTitle={"Ventilator Beds"}
                dates={dates}
                xTitle={"Date"}
                yTitle={"Hospital"}
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
