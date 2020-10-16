import React from 'react'
import { Flex, Grid, Text } from '@chakra-ui/core'

export default function SimpleTable({ colTitle1, colTitle2, maxNum }) {
  return (
    <Flex
      flexGrow="1"
      w={['100%', '100%', '100%', '50%']}
      direction={['column', 'column', 'column', 'row']}
      justify="center"
    >
      <Grid templateColumns="repeat(2, 1fr)" gap={3}>
        <Text textAlign="center" verticalAlign="middle" bg="red.100" p="5px">
          {colTitle1}
        </Text>
        <Text textAlign="center" verticalAlign="middle" bg="red.100" p="5px">
          {colTitle2}
        </Text>

        <Text textAlign="center" verticalAlign="middle" bg="red.100" p="5px">
          {' '}
          25%
        </Text>
        <Text textAlign="center" verticalAlign="middle" bg="red.100" p="5px">
          {Math.floor(maxNum * 0.25).toLocaleString()}
        </Text>
        <Text textAlign="center" verticalAlign="middle" bg="red.100" p="5px">
          {' '}
          43%
        </Text>
        <Text textAlign="center" verticalAlign="middle" bg="red.100" p="5px">
          {Math.floor(maxNum * 0.43).toLocaleString()}
        </Text>
        <Text textAlign="center" verticalAlign="middle" bg="red.100" p="5px">
          {' '}
          60%
        </Text>
        <Text textAlign="center" verticalAlign="middle" bg="red.100" p="5px">
          {Math.floor(maxNum * 0.6).toLocaleString()}
        </Text>
        <Text textAlign="center" verticalAlign="middle" bg="red.100" p="5px">
          {' '}
          90%
        </Text>
        <Text textAlign="center" verticalAlign="middle" bg="red.100" p="5px">
          {Math.floor(maxNum * 0.9).toLocaleString()}
        </Text>
      </Grid>
    </Flex>
  )
}
