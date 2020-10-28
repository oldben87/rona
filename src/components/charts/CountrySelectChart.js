import React, { useState } from 'react'
import { Text, Flex, Divider, Button } from '@chakra-ui/core'
import { PageSection, TitleText } from '../common'
import CompareChart from './CompareChart'

export default function CountrySelectChart({ array, background }) {
  const [countryData, setCountryData] = useState(array[0])

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
        <Divider
          w="75%"
          alignSelf="center"
          color="red.700"
          borderColor="none"
        />
        <Text paddingLeft="1rem">
          Most Recent {'Cases'}:{' '}
          {countryData.line1.find((item) => item > 0).toLocaleString()}
        </Text>
        <Text paddingLeft="1rem">
          Total {'Cases'}: {countryData.cumState}
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
