import React from "react"
import styled from "styled-components"

export function PageWrap({ children }) {
  return <Main>{children}</Main>
}

const Main = styled.main`
  box-sizing: border-box;
  flex-grow: 1;
  margin: 0 auto;
`
