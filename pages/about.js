import Head from "next/head"
import React from "react"

import { Flex, Text, Divider } from "@chakra-ui/core"
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
          <Flex
            style={{
              margin: "0.7rem auto",
              flexDirection: "column",
              justifyContent: "center",
              width: "75%",
              minWidth: "290px",
              color: "dimgray",
            }}
          >
            <Text
              style={{
                padding: "0.5rem",
                alignSelf: "center",
                fontSize: "1.4rem",
                fontStyle: "bold",
                color: "black",
              }}
            >
              About This Team
            </Text>
            <Text fontSize="1rem" fontStyle="italic">
              I have been working on this page since the middle of September
              2020, all on my own.
            </Text>
            <Divider width={"50%"} alignSelf="center" />
            <Text fontSize="0.8rem" padding="0.2rem">
              I would like to use this website as a place of learning. A place
              to ask questions and see them answered using the data that we have
              available. I will do my utmost best to remove any bias I may have,
              and just show and explain the data.
            </Text>
            <Text fontSize="0.8rem" padding="0.2rem">
              Please do get in contact if you have any questions, please message
              me any questions you have regarding available data, or if there is
              something you would like to know.
            </Text>
          </Flex>
        </PageSection>
      </PageWrap>
      <PageFooter />
    </div>
  )
}
