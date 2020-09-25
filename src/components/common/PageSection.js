import React from "react"
import styled from "styled-components"

export function PageSection({ children, background }) {
  return <Section style={{ backgroundColor: background }}>{children}</Section>
}

const Section = styled.section`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  padding: 1rem;
  box-sizing: border-box;
  margin: 0 1rem;
  flex-wrap: wrap;
  justify-content: space-evenly;
`
