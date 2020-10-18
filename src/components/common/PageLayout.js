import Head from 'next/head'
import React from 'react'
import { Flex } from '@chakra-ui/core'
import { PageHeader, PageWrap, PageFooter } from '../common'

export const PageLayout = ({ children, tabTitle, headerTitle }) => {
  return (
    <Flex
      minH="100vh"
      w="100%"
      direction="column"
      justify="flex-start"
      align="flex-start"
    >
      <Head>
        <title>{tabTitle}</title>
        <link rel="icon" href="/assets/rona2.png" />
      </Head>
      <PageHeader name={headerTitle} />
      <PageWrap>{children}</PageWrap>
      <PageFooter />
    </Flex>
  )
}
