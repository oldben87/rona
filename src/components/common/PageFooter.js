import React from 'react'
import styled from 'styled-components'
import { Divider } from '@chakra-ui/core'

export function PageFooter() {
  return (
    <Footer>
      <Divider color="red.700" />
      <a href="mailto:questionsaboutcovid@gmail.com" target="_blank">
        Email
      </a>
    </Footer>
  )
}

const Footer = styled.footer`
  box-sizing: border-box;
  width: 100%;
  height: 5rem;
  padding: 1rem;
  margin-bottom: 1rem;
`
