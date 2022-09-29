import React from 'react'

import { useSelector } from 'react-redux'
import { purchaseCard } from 'contract/API'

import Layout from 'layout/layout'

export default function DealList() {
  const currentUser = useSelector((state: any) => state.currentUser)
  console.log(currentUser)
  const buyCard = (dealId: any, walletAddress: any, wantedPrice: any) => {
    console.log(currentUser.wallet)
    purchaseCard('0x84dCc175506AE128216f2440C16AEFbf60e1f2f8', walletAddress, 10)
  }
  return (
    <Layout>
      <main>
        여긴 DealList
        <button
          onClick={() =>
            buyCard('0x84dCc175506AE128216f2440C16AEFbf60e1f2f8', currentUser.wallet, 10)
          }
        >
          구매하기 test
        </button>
      </main>
    </Layout>
  )
}
