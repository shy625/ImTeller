import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import Layout from 'layout/layout'
import deal from 'actions/api/deal'
import { setDealDetail } from 'store/modules/art'

export default function DealDetail() {
  const dispatch = useDispatch()
  const dealId = useParams()

  useEffect(() => {
    deal.dealDetail(dealId).then((result) => {
      console.log(result)
      dispatch(setDealDetail(result.data))
    })
  })

  return (
    <Layout>
      <main></main>
    </Layout>
  )
}
