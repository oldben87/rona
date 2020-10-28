import React, { useState, useEffect } from 'react'
import { Flex, Heading, Box, Collapse } from '@chakra-ui/core'
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
        <NavButton
          onClick={() => setShowLinks(!showLinks)}
          display={['block', 'block', 'none', 'none']}
        >
          <Box as={HiMenu} size={28} color="red.800" />
        </NavButton>
        {renderLinks()}
      </>
    )
  }

  const renderLinks = () => {
    return showCollapse ? (
      <Collapse mt={4} isOpen={showLinks} flexDirection="column">
        <Flex direction="column">
          <NavLinks />
        </Flex>
      </Collapse>
    ) : (
      <Flex flexDirection="row">
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
        color="red.800"
        fontWeight="500"
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
const NavButton = styled.button`
  display: flex;
  flex-grow: 0;
  &:focus {
    outline: none;
    border: 2px black solid;
    border-radius: 3px;
  }
  justify-content: start;
  padding: 0.5rem;
  box-sizing: border-box;
  max-height: calc(1rem + 28px);
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    display: none;
  }
`
