import React, { useState } from 'react'
import { Flex, Heading, Button, Box } from '@chakra-ui/core'
import Link from 'next/link'
import styled from 'styled-components'
import { HiMenu } from 'react-icons/hi'

export function PageHeader({ name }) {
  const [showLinks, setShowLinks] = useState(true)

  const renderLinksWrap = () => {
    return (
      <>
        <Button
          onClick={() => setShowLinks(!showLinks)}
          display={['block', 'block', 'none', 'none']}
        >
          <Box as={HiMenu} />
        </Button>
        <Flex direction={['column', 'column', 'row', 'row']}>
          {renderLinks()}
        </Flex>
      </>
    )
  }

  const renderLinks = () => {
    const DISPLAY_VAR = showLinks ? 'flex' : 'none'
    return (
      <Flex
        display={[DISPLAY_VAR, DISPLAY_VAR, 'flex', 'flex']}
        direction={['column', 'column', 'row', 'row']}
      >
        <Link href="/" passHref>
          <NavLink>Home</NavLink>
        </Link>
        <Link href="/about" passHref>
          <NavLink>About</NavLink>
        </Link>
        <Link href="/questions" passHref>
          <NavLink>Questions</NavLink>
        </Link>
        <Link href="/countries" passHref>
          <NavLink>UK Countries</NavLink>
        </Link>
        <Link href="/testpage">
          <NavLink>Test Page</NavLink>
        </Link>
      </Flex>
    )
  }
  return (
    <Header>
      <Heading
        as="h1"
        p="0.5rem"
        paddingLeft="1rem"
        color="red.800"
        m="0 auto"
        maxWidth="1100px"
        boxSizing="border-box"
      >
        {name}
      </Heading>
      <Flex
        justify={['start', 'start', 'center', 'center']}
        maxWidth="1100px"
        boxSizing="border-box"
        m="0 auto"
        paddingLeft={['2rem', '2rem', '0', '0']}
      >
        {renderLinksWrap()}
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
  align-items: center;
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
    outline-color: #212121;
    outline-width: 5px;
  }
`
