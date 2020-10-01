import React from "react"
import { Flex, Heading } from "@chakra-ui/core"
import Link from "next/link"
import styled from "styled-components"

export function PageHeader({ name }) {
  return (
    <Header>
      <Heading
        as="h1"
        p="0.5rem"
        paddingLeft="1rem"
        color="red.800"
        maxWidth="1000px"
        m="0 auto"
      >
        {name}
      </Heading>
      <Flex justify="center">
        <Link href="/">
          <NavLink>Home</NavLink>
        </Link>
        <Link href="/about">
          <NavLink>About</NavLink>
        </Link>
        <Link href="/changes">
          <NavLink>Questions</NavLink>
        </Link>
      </Flex>
    </Header>
  )
}

const Header = styled.header`
  padding: 0.5rem;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
`
const NavLink = styled.a`
  padding: 0.1rem 0.5rem;
  margin: 0.2rem;
  border-bottom: #9b2c2c 2px solid;
  border-bottom-length: 75%;
  &:hover {
    background-color: #9b2c2c;
    cursor: pointer;
    border-radius: 3px;
    color: #fff;
  }
  &:focus {
    outline: blue;
  }
`
