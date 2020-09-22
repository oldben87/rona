import React from "react"
import styled from "styled-components"

export function PageFooter() {
  return (
    <Footer>
      <a href={"/"}>Home</a>
      <br />
      <a href={"mailto: b-webb@outlook.com"}>Email</a>
    </Footer>
  )
}

const Footer = styled.footer`
  box-sizing: border-box;
  width: 100%;
  height: 5rem;
  padding: 1rem;
`
