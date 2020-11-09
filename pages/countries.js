import React from 'react'

import { fetchCountries } from 'queries'
import { PageLayout, ErrorText } from 'components/common'
import CountrySelectChart from 'components/charts/CountrySelectChart'

const Countries = ({
  england,
  wales,
  scotland,
  northernIreland,
  intialValue,
}) => {
  const error =
    england.error || wales.error || scotland.error || northernIreland.error

  if (error) {
    return (
      <PageLayout
        tabTitle="COVID-19 UK Breakdown"
        headerTitle="Breakdown of UK"
      >
        <ErrorText error={error} />
      </PageLayout>
    )
  }

  const englandObject = {
    country: 'England',
    line1: intialValue.map((item) => item.newCases),
    line2: intialValue.map((item) => item.caseSevenDay),
    dates: intialValue.map((item) => item.date),
    cumState: intialValue
      .map((item) => item.cumCasesByPublishDate)
      .find((num) => num > 0)
      .toLocaleString(),
  }

  const casesArray = [
    {
      country: 'England',
      line1: england.map((item) => item.newCases),
      line2: england.map((item) => item.caseSevenDay),
      dates: england.map((item) => item.date),
      cumState: england
        .map((item) => item.cumCasesByPublishDate)
        .find((num) => num > 0)
        .toLocaleString(),
    },
    {
      country: 'Wales',
      line1: wales.map((item) => item.newCases),
      line2: wales.map((item) => item.caseSevenDay),
      dates: wales.map((item) => item.date),
      cumState: wales
        .map((item) => item.cumCasesByPublishDate)
        .find((num) => num > 0)
        .toLocaleString(),
    },
    {
      country: 'Scotland',
      line1: scotland.map((item) => item.newCases),
      line2: scotland.map((item) => item.caseSevenDay),
      dates: scotland.map((item) => item.date),
      cumState: scotland
        .map((item) => item.cumCasesByPublishDate)
        .find((num) => num > 0)
        .toLocaleString(),
    },
    {
      country: 'NI',
      line1: northernIreland.map((item) => item.newCases),
      line2: northernIreland.map((item) => item.caseSevenDay),
      dates: northernIreland.map((item) => item.date),
      cumState: northernIreland
        .map((item) => item.cumCasesByPublishDate)
        .find((num) => num > 0)
        .toLocaleString(),
    },
  ]

  return (
    <PageLayout tabTitle="COVID-19 UK Breakdown" headerTitle="Breakdown of UK">
      <CountrySelectChart
        array={casesArray}
        loadData={englandObject}
        background="#fff5f5"
      />
    </PageLayout>
  )
}

export default Countries

export async function getServerSideProps() {
  const { england, wales, scotland, northernIreland } = await fetchCountries()
  return {
    props: {
      england,
      wales,
      scotland,
      northernIreland,
      intialValue: england,
    },
  }
}
