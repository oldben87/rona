import React from 'react'
import { TextRow } from './common'

export default function Everything({ item, title }) {
  return (
    <div>
      <div>
        <TextRow>
          <p>{item.date}</p>
          <p>:</p>
          <p>"{title}"</p>
        </TextRow>
        <TextRow>
          <p>{item.newCases}</p>
          <p>:</p>
          <p>"newCasesByPublishDate"</p>
        </TextRow>
        <p>{item.newTests}: "newTestsByPublishDate"</p>
        <p>{item.newDeaths}: "newDeaths28DaysByDeathDate"</p>
        <p>{item.newAdmissions}: "newAdmissions"</p>
        <p>{item.cumAdmissions}: "cumAdmissions"</p>
        <p>{item.covidBeds}: "covidOccupiedMVBeds"</p>
        <p>{item.hospitalCases}: "hospitalCases"</p>
        <p>{item.cumCasesByPublishDate}: "cumCasesByPublishDate"</p>
        <p>{item.cumCasesBySpecimenDateRate}: "cumCasesBySpecimenDateRate"</p>
        <p>{item.newCasesBySpecimenDate}: "newCasesBySpecimenDate"</p>
        <p>{item.cumCasesBySpecimenDateRate}: "cumCasesBySpecimenDateRate"</p>
        {/* <p>{item.maleCases}: "maleCases"</p>
        <p>{item.femaleCases}: "femaleCases"</p> */}
        <p>
          {item.newPillarOneTestsByPublishDate}:
          "newPillarOneTestsByPublishDate"
        </p>
        <p>
          {item.cumPillarOneTestsByPublishDate}:
          "cumPillarOneTestsByPublishDate"
        </p>
        <p>
          {item.newPillarTwoTestsByPublishDate}:
          "newPillarTwoTestsByPublishDate"
        </p>
        <p>
          {item.cumPillarTwoTestsByPublishDate}:
          "cumPillarTwoTestsByPublishDate"
        </p>
        <p>
          {item.newPillarThreeTestsByPublishDate}:
          "newPillarThreeTestsByPublishDate"
        </p>
        <p>
          {item.cumPillarThreeTestsByPublishDate}:
          "cumPillarThreeTestsByPublishDate"
        </p>
        <p>
          {item.newPillarFourTestsByPublishDate}:
          "newPillarFourTestsByPublishDate"
        </p>
        <p>
          {item.cumPillarFourTestsByPublishDate}:
          "cumPillarFourTestsByPublishDate"
        </p>
        <p>
          {item.cumAdmissionsByAge
            ? item.cumAdmissionsByAge.map((age) => {
                return (
                  <React.Fragment key={age.age}>
                    <p>
                      age : {age.age} | value : {age.value} | rate : {age.rate}
                    </p>
                  </React.Fragment>
                )
              })
            : null}
          : "cumAdmissionsByAge"
        </p>
        <p>{item.cumTestsByPublishDate}: "cumTestsByPublishDate"</p>
        <p>
          {item.plannedCapacityByPublishDate}: "plannedCapacityByPublishDate"
        </p>
        <p>
          {item.newDeaths28DaysByPublishDate}: "newDeaths28DaysByPublishDate"
        </p>
        <p>
          {item.cumDeaths28DaysByPublishDate}: "cumDeaths28DaysByPublishDate"
        </p>
        <p>
          {item.cumDeaths28DaysByPublishDateRate}:
          "cumDeaths28DaysByPublishDateRate"
        </p>
        <p>{item.newDeaths28DaysByDeathDate}: "newDeaths28DaysByDeathDate"</p>
        <p>{item.cumDeaths28DaysByDeathDate}: "cumDeaths28DaysByDeathDate"</p>
        <p>
          {item.cumDeaths28DaysByDeathDateRate}:
          "cumDeaths28DaysByDeathDateRate"
        </p>
      </div>
    </div>
  )
}
