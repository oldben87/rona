import React from 'react'
import { Text } from '@chakra-ui/core'

export function TableCell({ children, bg = 'white', weight }) {
  return (
    <Text
      textAlign="center"
      justifyContent="center"
      bg={bg}
      p={['2px', '4px', '5px', '5px']}
      display="flex"
      flexDirection="column"
      fontWeight={weight}
      fontSize={['0.8rem', '0.8rem', '1rem', '1rem']}
    >
      {children}
    </Text>
  )
}
