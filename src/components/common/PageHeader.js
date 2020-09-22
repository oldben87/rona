import React from "react"
import { Flex, Heading, List, ListItem } from "@chakra-ui/core"
import Link from "next/link"
import styled from "styled-components"

export function PageHeader({ name }) {
  return (
    <Header>
      <Flex height={"100%"} align="center" justify="space-between">
        <Heading as="h1">{name}</Heading>
        <List>
          <ListItem>
            <Link href="/">
              <a>Home</a>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/about">
              <a>About Us</a>
            </Link>
          </ListItem>
        </List>
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
