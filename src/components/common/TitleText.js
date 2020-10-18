import React from 'react'
import { Text, Divider } from '@chakra-ui/core'

export function TitleText({ children, size = '3xl', align }) {
  return (
    <>
      <Text
        as="h2"
        p={2}
        fontSize={size}
        textAlign={align}
        color="red.800"
        p="1rem"
      >
        {children}
      </Text>
    </>
  )
}
