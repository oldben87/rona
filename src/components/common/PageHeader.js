import React, { useState, useEffect } from 'react'
import { Flex, Heading, Button, Box, Collapse } from '@chakra-ui/core'
import styled from 'styled-components'
import { HiMenu } from 'react-icons/hi'

import { NavLinks } from 'components/common'

export function PageHeader({ name }) {
  const [showLinks, setShowLinks] = useState(false)
  const [showCollapse, setShowCollapse] = useState(null)

  useEffect(() => {
    function toggleCollapse() {
      window.innerWidth <= 768 ? setShowCollapse(true) : setShowCollapse(false)
    }
    window.addEventListener('resize', toggleCollapse)
    toggleCollapse()
    return () => window.removeEventListener('resize', toggleCollapse)
  }, [])

  const renderLinksWrap = () => {
    return (
      <>
        <Button
          onClick={() => setShowLinks(!showLinks)}
          display={['block', 'block', 'none', 'none']}
          color="#cfcfcf"
          border="#cfcfcf solid 2px"
          borderRadius="3px"
        >
          <Box as={HiMenu} />
        </Button>
        {renderLinks()}
      </>
    )
  }

  const renderLinks = () => {
    return showCollapse ? (
      <Collapse mt={4} isOpen={showLinks} flexDirection={'column'}>
        <NavLinks />
      </Collapse>
    ) : (
      <Flex>
        <NavLinks />
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
