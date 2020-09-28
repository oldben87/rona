import Head from "next/head"
import React from "react"
import fetch from "isomorphic-unfetch"
import styles from "../styles/Home.module.css"
import { Text, Flex } from "@chakra-ui/core"
import {
  PageHeader,
  PageWrap,
  PageSection,
  PageFooter,
} from "../src/components/common"
import CompareChart from "../src/components/CompareChart"

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
              <Flex w="100%" flexDir="column">
                <Text as="h2" alignSelf="center">
                  Daily Case Numbers
                </Text>
                <Flex justify="space-evenly" w="100%">
                  <Text>Most Recent: {data[0].newCases.toLocaleString()}</Text>
                  <Text>
                    Total Cases:{" "}
                    {data
                      .map((item) => item.newCases)
                      .reduce((a, b) => a + b)
                      .toLocaleString()}
                  </Text>
                </Flex>
              </Flex>
              <CompareChart
                main={data.map((item) => item.newCases)}
                baseLine={data.map((item) => item.caseSevenDay)}
                mainTitle={"New Cases"}
                baseLineTitle={"7 Day Cases"}
                dates={data.map((item) => item.date)}
                xTitle={"Date"}
                yTitle={"Cases"}
              />
            </PageSection>
            <PageSection>
              <Flex w="100%" flexDir="column">
                <Text as="h2" alignSelf="center">
                  Daily Testing Numbers
                </Text>
                <Flex justify="space-evenly" w="100%">
                  <Text>
                    Most Recent:{" "}
                    {data[0].newTests !== 0
                      ? data[0].newTests.toLocaleString()
                      : "No Data"}
                  </Text>
                  <Text>
                    Total Tests:{" "}
                    {data
                      .map((item) => item.newTests)
                      .reduce((a, b) => a + b)
                      .toLocaleString()}
                  </Text>
                </Flex>
              </Flex>
              <CompareChart
                main={data.map((item) => item.newTests)}
                baseLine={data.map((item) => item.testSevenDay)}
                mainTitle={"New Tests"}
                baseLineTitle={"7 Day Tests"}
                dates={data.map((item) => item.date)}
                xTitle={"Date"}
                yTitle={"Tests"}
              />
            </PageSection>
            <PageSection>
              <Flex w="100%" flexDir="column">
                <Text as="h2" alignSelf="center">
                  Daily Death Numbers
                </Text>
                <Flex justify="space-evenly" w="100%">
                  <Text>
                    Most Recent:{" "}
                    {data[2].newDeaths !== 0
                      ? data[2].newDeaths.toLocaleString()
                      : "No Data"}
                  </Text>
                  <Text>
                    Total Deaths:{" "}
                    {data
                      .map((item) => item.newDeaths)
                      .reduce((a, b) => a + b)
                      .toLocaleString()}
                  </Text>
                </Flex>
              </Flex>
              <CompareChart
                main={data.map((item) => item.newDeaths)}
                baseLine={data.map((item) => item.deathSevenDay)}
                mainTitle={"New Deaths"}
                baseLineTitle={"7 Day Deaths"}
                dates={data.map((item) => item.date)}
                xTitle={"Date"}
                yTitle={"Deaths"}
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
  headers.append("pragma", "no-cache")
  headers.append("Cache-Control", "s-maxage=60, stale-while-revalidate")

  const callRona = `${
    process.env.NODE_ENV === "production"
      ? "https://rona-olive.vercel.app"
      : "http://localhost:3000"
  }/api/dashboard`

  const res = await fetch(callRona, headers)
  const response = await res.json()

  return {
    props: {
      data: response.data,
    },
  }
}
