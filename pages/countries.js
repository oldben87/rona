import React from 'react'

import { fetchCountries } from 'queries'
import {
  PageLayout,
  PageSection,
  ErrorText,
  TitleText,
} from 'components/common'
import ChartSection from 'components/charts/ChartSection'

const Countries = ({ england, wales, scotland, northernIreland }) => {
  const error =
    england.error || wales.error || scotland.error || northernIreland.error

  if (error) {
    return (
      <PageLayout tabTitle="COVID-19 Countries" headerTitle="Breakdown of UK">
        <ErrorText error={error} />
      </PageLayout>
    )
  }
  return (
    <PageLayout tabTitle="COVID-19 UK NewPage" headerTitle="UK Breakdowns">
      <ChartSection
        chartTitle="England's Case Numbers"
        line1={england.map((item) => item.newCases)}
        line1Title={'New Cases'}
        yTitle={'Cases'}
        line2={england.map((item) => item.caseSevenDay)}
        line2Title={'7 Day Average'}
        dates={england.map((item) => item.date)}
        background="#fff5f5"
        cumStat={england
          .map((item) => item.cumCasesByPublishDate)
          .find((num) => num > 0)
          .toLocaleString()}
      />
      <ChartSection
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
    },
  }
}
