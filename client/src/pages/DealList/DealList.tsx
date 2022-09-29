import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Search from 'pages/DealList/search'
import Layout from 'layout/layout'
import Deal from 'components/deal'

import deal from 'actions/api/deal'

export default function DealList() {
  const dealList = useSelector((state: any) => state.dealList)

  return (
    <Layout>
      <main>
        <Search />
        <div>
          {dealList.map((deal) => (
            <Deal deal={deal} key={deal.dealId} />
          ))}
        </div>
      </main>
    </Layout>
  )
}
