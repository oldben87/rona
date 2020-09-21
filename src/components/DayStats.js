import React from "react"
import { Flex, Text, Divider } from "@chakra-ui/core"
import { TextRow } from "./common"

export default function DayStats({ item }) {
  return (
    <Flex
      bg="blackAlpha.400"
      direction="column"
      borderRadius="0.2rem"
      padding="1rem"
      margin="0.5rem"
      color="white"
      border="1px dimgrey solid"
      boxShadow="0 0 0.1rem 0.1rem rgba(0, 0, 0, 0.2)"
      width={[
        "100%", // base
        "100%", // 480px upwards
        "45%", // 768px upwards
        "45%", // 992px upwards
      ]}
      boxSizing="border-box"
      flexShrink="0"
    >
      {item.date ? (
        <Text fontSize="1.4rem" fontWeight="600" alignSelf="center">
          {item.date}
        </Text>
      ) : null}
      {item.newCases ? (
        <>
          <TextRow>
            <Text>New Cases in last 24 hours:</Text>
            <Text textAlign="end">{item.newCases}</Text>
          </TextRow>
          <Divider />
        </>
      ) : null}
      {item.caseChange ? (
        <>
          <TextRow>
            <Text>Change in cases from previous day:</Text>
            <Text textAlign="end">
              {item.caseChange} (
              <span
                style={
                  item.casePercentage > 0
                    ? { color: "red" }
                    : { color: "green" }
                }
              >
                {item.casePercentage}%
              </span>
              )
            </Text>
          </TextRow>
          <Divider />
        </>
      ) : null}
      {item.caseSevenDay ? (
        <>
          <TextRow>
            <Text>Cases average from last 7 days:</Text>
            <Text textAlign="end">
              {item.caseSevenDay} (
              <span
                style={
                  item.sevenDayCasePercentage > 0
                    ? { color: "red" }
                    : { color: "green" }
                }
              >
                {item.sevenDayCasePercentage}%
              </span>
              )
            </Text>
          </TextRow>
          <Divider />
        </>
      ) : null}
      {item.newTests ? (
        <>
          <TextRow>
            <Text>Tests in last 24 hours:</Text>
            <Text textAlign="end">{item.newTests}</Text>
          </TextRow>
          <Divider />
        </>
      ) : null}
      {item.testChange ? (
        <>
          <TextRow>
            <Text>Change in tests number from previous day:</Text>
            <Text textAlign="end">
              {item.testChange} (
              <span
                style={
                  item.testPercentage < 0
                    ? { color: "red" }
                    : { color: "green" }
                }
              >
                {item.testPercentage}%
              </span>
              )
            </Text>
          </TextRow>
          <Divider />
        </>
      ) : null}
      {item.testSevenDay ? (
        <>
          <TextRow>
            <Text>Testing average last 7 days:</Text>
            <Text textAlign="end">
              {item.testSevenDay} (
              <span
                style={
                  item.sevenDayTestPercentage < 0
                    ? { color: "red" }
                    : { color: "green" }
                }
              >
                {item.sevenDayTestPercentage}%
              </span>
              )
            </Text>
          </TextRow>
        </>
      ) : null}
    </Flex>
  )
}
