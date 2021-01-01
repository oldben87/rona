import React from 'react'
import Link from 'next/link'
import { PageLayout, PageSection } from 'components/common'

export default function questions() {
  return (
    <PageLayout
      tabTitle="COVID-19 UK Questions"
      headerTitle="Questions about COVID"
    >
      <PageSection justify="start" background="#fff5f5">
        <Link href="/casestotests" passHref>
          <a>What is the current percentage of cases to tests?</a>
        </Link>
      </PageSection>
      <PageSection justify="start">
        <Link href="/herdImmunity" passHref>
          <a>
            What would be the impact to the UK if we followed a policy of herd
            immunity?
          </a>
        </Link>
      </PageSection>
      <PageSection justify="start" background="#fff5f5">
        <Link href="/children-cases" passHref>
          <a>Children Admitted to hospital</a>
        </Link>
      </PageSection>
    </PageLayout>
  )
}
