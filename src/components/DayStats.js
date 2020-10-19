import React from 'react'
import { Flex, Grid } from '@chakra-ui/core'
import { TitleText, TableCell } from './common'

export default function DayStats({ item }) {
  const renderTest = () => {
    if (item.testChange && item.testPercentage !== '-100.0') {
      return (
        <TableCell>
          <span>{item.testChange.toLocaleString()}</span>{' '}
          <span>
            (
            <span
              style={
                item.testPercentage < 0 ? { color: 'red' } : { color: 'green' }
              }
            >
              {item.testPercentage}%
            </span>
            )
          </span>
        </TableCell>
      )
    } else {
      return <TableCell>n/a</TableCell>
    }
  }

  return (
    <Flex
      bg="white"
      direction="column"
      borderRadius="0.2rem"
      padding="1rem"
      margin="0.5rem"
      color="dimgrey"
      boxShadow="0 0 3px 2px rgba(0, 0, 0, 0.2)"
      boxSizing="border-box"
      flexShrink="0"
      paddingBottom="1rem"
    >
      <TitleText align="center" size="2xl">
        {item.date}
      </TitleText>
      <Grid templateColumns="repeat(4, 1fr)" gap={1} bg="blackAlpha.50">
        <TableCell></TableCell>
        <TableCell weight="bold">Day Total</TableCell>
        <TableCell weight="bold">Change</TableCell>
        <TableCell weight="bold">7 Day avg</TableCell>
        <TableCell weight="bold">Cases</TableCell>
        <TableCell>{item.newCases.toLocaleString()}</TableCell>
        {item.caseChange ? (
          <TableCell>
            <span>{item.caseChange.toLocaleString()}</span>{' '}
            <span>
              (
              <span
                style={
                  item.casePercentage > 0
                    ? { color: 'red' }
                    : { color: 'green' }
                }
              >
                {item.casePercentage}%
              </span>
              )
            </span>
          </TableCell>
        ) : (
          <TableCell>n/a</TableCell>
        )}
        {item.caseSevenDay ? (
          <TableCell>
            <span>{parseInt(item.caseSevenDay).toLocaleString()}</span>
            <span>
              {' '}
              (
              <span
                style={
                  item.sevenDayCasePercentage > 0
                    ? { color: 'red' }
                    : { color: 'green' }
                }
              >
                {item.sevenDayCasePercentage}%
              </span>
              )
            </span>
          </TableCell>
        ) : (
          <TableCell>n/a</TableCell>
        )}
        <TableCell weight="bold">Tests</TableCell>
        <TableCell>
          {item.newTests > 0 ? item.newTests.toLocaleString() : 'n/a'}
        </TableCell>
        {renderTest()}
        {item.testSevenDay ? (
          <TableCell>
            <span>{parseInt(item.testSevenDay).toLocaleString()}</span>
            <span>
              {' '}
              (
              <span
                style={
                  item.sevenDayTestPercentage < 0
                    ? { color: 'red' }
                    : { color: 'green' }
                }
              >
                {item.sevenDayTestPercentage}%
              </span>
              )
            </span>
          </TableCell>
        ) : (
          <TableCell>n/a</TableCell>
        )}
      </Grid>
    </Flex>
  )
}
