import Head from "next/head"
import React, { useEffect, useState } from "react"
import useSWR from "swr"
import styles from "../styles/Home.module.css"
import {
  PageHeader,
  PageWrap,
  PageSection,
  PageFooter,
} from "../src/components/common"
import DayStats from "../src/components/DayStats"
import { page_header_name } from "../src/resources/strings"
import PercentageCompareChart from "../src/components/PercentageCompareChart"

const Home = () => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  async function fetchData() {
    try {
      const getData = await useSWR(
        `${
          process.env.NODE_ENV === "production"
            ? "https://rona-olive.vercel.app"
            : "http://localhost:3000"
        }/api/overview`
      )
      setData(getData.data.data)
      if (getData.data !== undefined) {
        setLoading(false)
        setError("")
      }
    } catch (err) {
      setError("Error fetching page Data")
    }
  }
  fetchData()

  return (
    <div className={styles.container}>
      <Head>
        <title>COVID-19 UK Figures</title>
        <link rel="icon" href="/assets/rona2.png" />
      </Head>
      <PageHeader name={page_header_name} />
      <PageWrap>
        {error === "" ? null : (
          <h1 style={{ margin: "5rem", color: "red" }}>{error}</h1>
        )}
        {!loading ? (
          <>
            <PercentageCompareChart data={data} />
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <h2>Daily stats for the last 28 Days</h2>
            </div>
            <PageSection>
              {data.slice(0, 28).map((item, i) => (
                <DayStats item={item} key={i} />
              ))}
            </PageSection>
          </>
        ) : (
          <h1 style={{ margin: "5rem" }}>Loading ... </h1>
        )}
      </PageWrap>
      <PageFooter />
    </div>
  )
}

export default Home

// export async function getServerSideProps() {
//   const callRona = `${
//     process.env.NODE_ENV === "production"
//       ? "https://rona-olive.vercel.app"
//       : "http://localhost:3000"
//   }/api/overview`
//   const res = await fetch(callRona)
//   const response = await res.json()
//   return {
//     props: {
//       data: response.data,
//     },
//   }
// }
