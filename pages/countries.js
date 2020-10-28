import React from 'react'

import { fetchCountries } from 'queries'
import { PageLayout, ErrorText } from 'components/common'
import ChartSection from 'components/charts/ChartSection'
import CountrySelectChart from 'components/charts/CountrySelectChart'

const Countries = ({ england, wales, scotland, northernIreland }) => {
  const error =
    england.error || wales.error || scotland.error || northernIreland.error

  const englandLine1 = england.map((item) => item.newCases)
  const englandLine2 = england.map((item) => item.caseSevenDay)

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
  const casesArray = [
    {
      country: 'England',
      line1: englandLine1,
      line2: englandLine2,
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
      <CountrySelectChart array={casesArray} background="#fff5f5" />
      {/* <ChartSection
        chartTitle="Wales' Case Numbers"
        line1={wales.map((item) => item.newCases)}
        line1Title={'New Cases'}
        yTitle={'Cases'}
        line2={wales.map((item) => item.caseSevenDay)}
        line2Title={'7 Day Average'}
        dates={wales.map((item) => item.date)}
        cumStat={wales
          .map((item) => item.cumCasesByPublishDate)
          .find((num) => num > 0)
          .toLocaleString()}
      />
      <ChartSection
        chartTitle="Scotland's Case Numbers"
        line1={scotland.map((item) => item.newCases)}
        line1Title={'New Cases'}
        yTitle={'Cases'}
        line2={scotland.map((item) => item.caseSevenDay)}
        line2Title={'7 Day Average'}
        dates={scotland.map((item) => item.date)}
        background="#fff5f5"
        cumStat={scotland
          .map((item) => item.cumCasesByPublishDate)
          .find((num) => num > 0)
          .toLocaleString()}
      />
      <ChartSection
        chartTitle="Northern Ireland's Case Numbers"
        line1={northernIreland.map((item) => item.newCases)}
        line1Title={'New Cases'}
        yTitle={'Cases'}
        line2={northernIreland.map((item) => item.caseSevenDay)}
        line2Title={'7 Day Average'}
        dates={northernIreland.map((item) => item.date)}
        cumStat={northernIreland
          .map((item) => item.cumCasesByPublishDate)
          .find((num) => num > 0)
          .toLocaleString()}
      /> */}
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
    },
  }
}
