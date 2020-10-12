import React from "react"
import fetch from "isomorphic-unfetch"
import { Flex, Text } from "@chakra-ui/core"
import { PageLayout, PageSection, ErrorText } from "../src/components/common"
import DayStats from "../src/components/DayStats"
import { page_header_name } from "../src/resources/strings"
import PercentageCompareChart from "../src/components/PercentageCompareChart"

const Changes = ({ data }) => {
  const { error } = data
  return (
    <PageLayout tabTitle="COVID-19 UK Questions" headerTitle={page_header_name}>
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
          ></div>
          <PageSection background="#fff5f5" flexDir="column">
            <Text as="h2" p={2} fontSize="3xl" color="red.800">
              Daily stats for the last 28 Days
            </Text>
            <Flex overflow="auto">
              {data.slice(0, 28).map((item, i) => (
                <DayStats item={item} key={i} />
              ))}
            </Flex>
          </PageSection>
        </>
      )}
    </PageLayout>
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
