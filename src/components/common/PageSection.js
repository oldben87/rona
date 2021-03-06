import React from 'react'
import styled from 'styled-components'

export const PageSection = ({
  children,
  background,
  justify = 'space-evenly',
}) => (
  <Section
    style={{
      backgroundColor: background,
      justifyContent: justify,
    }}
  >
    {children}
  </Section>
)
const Section = styled.section`
  display: flex;
  flex-grow: 1;
  padding: 3rem;
  box-sizing: border-box;
  margin: 0 1rem;
  flex-wrap: wrap;
  max-width: calc(100vw - 4rem);
  @media (max-width: 768px) {
    padding: 1rem;
    flexdirection: column;
  }
`
