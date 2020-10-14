import React from 'react'
import { Flex } from '@chakra-ui/core'

export const TextRow = ({ children }) => {
  return (
    <Flex
      flexDirection="row"
      width="100%"
      justifyContent="space-between"
      verticalAlign="center"
    >
      {children}
    </Flex>
  )
}
