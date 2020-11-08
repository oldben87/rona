import React, { useState } from 'react'
import { Text, Flex, Divider, Button } from '@chakra-ui/core'
import { PageSection, TitleText } from '../common'
import CompareChart from './CompareChart'

export default function CountrySelectChart({ array, background, loadData }) {
  const [countryData, setCountryData] = useState(loadData)
  // Whichever index is selected as the initial value of this state
  // Variable is the country you won't be able to see again after
  // coming back to it.

  return (
    <PageSection flexDir="column" background={background}>
      <Flex width="100%" justify={'center'}>
        {array.map((item, index) => {
          return (
            <Button
              key={index}
              variantColor={'red'}
              size="sm"
              variant="outline"
              color={'red.700'}
              margin="2px"
              onClick={() => {
                setCountryData(array[index])
              }}
            >
              {item.country}
            </Button>
          )
        })}
      </Flex>
      <Flex
        alignItems="space-between"
        flexDir="column"
        w={['100%', '100%', '25%', '25%']}
      >
        <TitleText size="2xl">{`${countryData.country}'s Cases`}</TitleText>
        {/* What's strange is how this TitleText does update. */}
        <Divider
          w="75%"
          alignSelf="center"
          color="red.700"
          borderColor="none"
        />
        <Text paddingLeft="1rem">
          Most Recent {'Cases'}:{' '}
          {countryData.line1.find((item) => item > 0).toLocaleString()}
          {/* But this value, like the graph, won't update, and just "sticks"
					like the line graph does. */}
        </Text>
        <Text paddingLeft="1rem">
          Total {'Cases'}: {countryData.cumState}
          {/* For some reason, the above value updates just fine. */}
        </Text>
      </Flex>
      <CompareChart
        line1={countryData.line1}
        line2={countryData.line2}
        line1Title={'New Cases'}
        line2Title={'7 Day Average'}
        dates={countryData.dates}
        xTitle={'Date'}
        yTitle={'Cases'}
      />
    </PageSection>
  )
}
