import React from 'react'
import { Text, Divider } from '@chakra-ui/core'

export function TitleText({ children }) {
  return (
    <>
      <Text as="h2" p={2} fontSize="3xl" color="red.800" p="1rem">
        {children}
      </Text>
    </>
  )
}
