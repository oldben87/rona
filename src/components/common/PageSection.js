import React from "react"
import styled from "styled-components"

export function PageSection({ children, background }) {
  return <Section style={{ backgroundColor: background }}>{children}</Section>
}

const Section = styled.section`
  display: flex;
  padding: 2rem 3rem;
  box-sizing: border-box;
  margin: 0 1rem;
`
