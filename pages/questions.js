import React from 'react'
import Link from 'next/link'
import { PageLayout, PageSection } from '../src/components/common'

export default function questions() {
  return (
    <PageLayout
      tabTitle="COVID-19 UK Questions"
      headerTitle="Questions about COVID"
    >
      <PageSection background="#fff5f5" justify="start">
        <Link href="/changes" passHref>
          <a>
            Does the change in new cases reflect the change in the number of
            tests?
          </a>
        </Link>
      </PageSection>
      <PageSection justify="start">
        <Link href="/casestotests" passHref>
          <a>What is the current percentage of cases to tests?</a>
        </Link>
      </PageSection>
      <PageSection background="#fff5f5" justify="start">
        <Link href="/herdImmunity" passHref>
          <a>
            What would be the impact to the UK if we followed a policy of herd
            immunity?
          </a>
        </Link>
      </PageSection>
    </PageLayout>
  )
}
