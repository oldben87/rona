import React from 'react'
import { Text } from '@chakra-ui/core'

export function TableCell({ children, bg = 'white', weight }) {
  return (
    <Text
      textAlign="center"
      justifyContent="center"
      bg={bg}
      p="5px"
      display="flex"
      flexDirection="column"
      fontWeight={weight}
    >
      {children}
    </Text>
  )
}
