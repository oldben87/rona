import React from "react"
import { Flex, Heading } from "@chakra-ui/core"
import styled from "styled-components"

export function PageHeader({ name }) {
  return (
    <Header>
      <Flex height={"100%"} align="center" justify="center">
        <Heading as="h1">{name}</Heading>
      </Flex>
    </Header>
  )
}

const Header = styled.header`
  box-sizing: border-box;
  padding: 0.5rem;
  width: 100%;
  height: 5rem;
  box-shadow: 0 0.3rem 0.5rem #cfcfcf;
`
