import React from 'react'
import { Text, Flex, Divider } from '@chakra-ui/core'
import { PageSection, TitleText } from '../common'
import CompareChart from './CompareChart'
import ThreeLineChart from './ThreeLineChart'

export default function ChartSection({
  chartTitle,
  line1,
  line1Title,
  yTitle,
  line2,
  line2Title,
  thirdLine,
  thirdLineTitle,
  dates,
  background,
  cumStat,
}) {
  return (
    <PageSection flexDir="column" background={background}>
      <Flex
        alignItems="space-between"
        flexDir="column"
        w={['100%', '100%', '25%', '25%']}
      >
        <TitleText>{chartTitle}</TitleText>
        <Divider w="75%" alignSelf="center" color="red.700" />
        <Text paddingLeft="1rem">
          Most Recent {yTitle}:{' '}
          {line1.find((item) => item > 0).toLocaleString()}
        </Text>
        <Text paddingLeft="1rem">
          Total {yTitle}: {cumStat}
        </Text>
      </Flex>
      {thirdLine ? (
        <ThreeLineChart
          line1={line1}
          line2={line2}
          line1Title={line1Title}
          line2Title={line2Title}
          thirdLine={thirdLine}
          thirdLineTitle={thirdLineTitle}
          dates={dates}
          xTitle={'Date'}
          yTitle={yTitle}
        />
      ) : (
        <CompareChart
          line1={line1}
          line2={line2}
          line1Title={line1Title}
          line2Title={line2Title}
          dates={dates}
          xTitle={'Date'}
          yTitle={yTitle}
        />
      )}
    </PageSection>
  )
}
