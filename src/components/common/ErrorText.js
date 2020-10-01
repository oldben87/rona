import React from "react"
import { Text } from "@chakra-ui/core"

export function ErrorText({ error }) {
  return (
    <Text
      p="2rem"
      borderColor="red.600"
      borderWidth="2px"
      borderRadius="0.5rem"
      margin="1rem"
      backgroundColor="red.100"
      fontWeight="500"
      maxWidth="500px"
    >
      {error}
    </Text>
  )
}
