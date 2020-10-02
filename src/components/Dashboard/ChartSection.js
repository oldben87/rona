import React from "react"
import { Text, Flex, Divider } from "@chakra-ui/core"
import { PageSection } from "../common"
import CompareChart from "../CompareChart"
import ThreeLineChart from "../ThreeLineChart"

export default function ChartSection({
  chartTitle,
  main,
  mainTitle,
  yTitle,
  baseLine,
  baseLineTitle,
  thirdLine,
  thirdLineTitle,
  dates,
  background,
}) {
  return (
    <PageSection flexDir="column" background={background}>
      <Flex
        alignItems="space-between"
        flexDir="column"
        w={["100%", "100%", "25%", "25%"]}
      >
        <Text as="h2" p={2} fontSize="3xl" color="red.800">
          {chartTitle}
        </Text>
        <Divider w="75%" alignSelf="center" />
        <Text paddingLeft="1rem">
          Most Recent {yTitle}: {main.find((item) => item > 0).toLocaleString()}
        </Text>
        <Text paddingLeft="1rem">
          Total {yTitle}: {main.reduce((a, b) => a + b).toLocaleString()}
        </Text>
      </Flex>
      {thirdLine ? (
        <ThreeLineChart
          main={main}
          baseLine={baseLine}
          mainTitle={mainTitle}
          baseLineTitle={baseLineTitle}
          thirdLine={thirdLine}
          thirdLineTitle={thirdLineTitle}
          dates={dates}
          xTitle={"Date"}
          yTitle={yTitle}
        />
      ) : (
        <CompareChart
          main={main}
          baseLine={baseLine}
          mainTitle={mainTitle}
          baseLineTitle={baseLineTitle}
          dates={dates}
          xTitle={"Date"}
          yTitle={yTitle}
        />
      )}
    </PageSection>
  )
}
