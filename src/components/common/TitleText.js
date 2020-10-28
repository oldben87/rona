import React from 'react'
import { Text } from '@chakra-ui/core'

export function TitleText({ children, size = '3xl', align }) {
  return (
    <>
      <Text
        as="h2"
        p={2}
        fontSize={size}
        textAlign={align}
        color="red.700"
        p="1rem"
      >
        {children}
      </Text>
    </>
  )
}
