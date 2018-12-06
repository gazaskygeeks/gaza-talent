const express = require('express')
const Airtable = require('airtable')

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY
})

const tableName = 'Freelancers Cohort 4 & 5 Availability'

const base = Airtable.base('appgBOlw7B0N1kQiq')
const router = new express.Router()

const onNextPage = recordPrev => (records, fetchNextPage) => {
  records.forEach(record => {
    recordPrev.push(record)
  })

  fetchNextPage()
}

const onDone = (res, records) => err => {
  if (err) {
    console.error(err)
    return res.notFound()
  }

  return res.json(records)
}

router.get('/talent', (req, res) => {
  let totalRecords = []

  base(tableName)
    .select({
      view: 'Grid view'
    })
    .eachPage(onNextPage(totalRecords), onDone(res, totalRecords))
})

module.exports = router
