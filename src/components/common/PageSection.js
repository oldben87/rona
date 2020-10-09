import React from "react"
import styled from "styled-components"

export const PageSection = ({ children, background, justify }) => (
  <Section
    style={{
      backgroundColor: background,
      justifyContent: justify ? justify : "space-evenly",
    }}
  >
    {children}
  </Section>
)
const Section = styled.section`
  display: flex;
  flex-grow: 1;
  padding: 1rem;
  box-sizing: border-box;
  margin: 0 1rem;
  flex-wrap: wrap;
  max-width: 1500px;
  @media (max-width 425px) : {
    padding: 0.25rem;
    flexdirection: column;
  }
  overflow: hidden;
`
