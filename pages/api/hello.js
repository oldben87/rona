// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { resolveHref } from "next/dist/next-server/lib/router/router"

export default async (req, res) => {
  const callRona =
    "https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure={%22date%22:%22date%22,%22newCases%22:%22newCasesByPublishDate%22,%20%22newTests%22:%22newTestsByPublishDate%22}"
  try {
    await fetch(callRona)
      .then((response) => response.json())
      .then((data) => {
        res.send({ status: 200, data: data.data })
      })
  } catch {
    res.send({ status: 400, error: "Failed to fetch" })
  }
}
