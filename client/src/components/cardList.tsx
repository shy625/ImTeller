import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import Card from 'components/card'
import Paint from 'components/paint'

import { createCard, sellCard } from 'contract/API'
import { allowedNodeEnvironmentFlags } from 'process'

export default function CardList(props: any) {
  const { cardList } = props
  const currentUser = useSelector((state: any) => state.currentUser)

  const [connectedWallet, setConnectedWallet] = useState('')
  const metamaskConnected = () => {
    if (!window.ethereum) {
      // alert('메타마스크 설치해')
      window.open('https://metamask.io/download.html')
      return false
    } else {
      window.ethereum.request({ method: 'eth_requestAccounts' }).then((result: any) => {
        console.log('메타메스크 로그인 완료')
        setConnectedWallet(result[0])
        return true
      })
    }
  }
  const mintPaint = async (walletAddress: any, image: any) => {
    console.log('민팅 함수 시작')
    console.log(walletAddress)
    const check = await metamaskConnected()
    console.log(connectedWallet)
    if (connectedWallet === currentUser.wallet) {
      console.log('카드 팔아야지')
      const selling = await createCard(walletAddress, image)
    }
  }
  const registerCard = async (
    walletAddress: string,
    image: any,
    token_id: any,
    wantedPrice: any,
  ) => {
    const check = await metamaskConnected()
    console.log(connectedWallet)
    if (connectedWallet === currentUser.wallet) {
      console.log('카드 팔아야지')
      const selling = await sellCard(walletAddress, image, token_id, wantedPrice)
    }
  }
  let tempImg = 'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20222729012744-하트.png'
  return (
    <div>
      <button onClick={() => registerCard(currentUser.wallet, tempImg, 3, 10)}>
        카드 등록 test
      </button>
      {cardList.length ? (
        cardList[0].cardId ? (
          cardList.map((card) => {
            return (
              <div key={card.cardId}>
                <Card card={card} />
              </div>
            )
          })
        ) : (
          cardList.map((paint) => {
            return (
              <div
                key={paint.paintId}
                onClick={() => mintPaint(currentUser.wallet, paint.paintImageURL)}
              >
                <Paint paint={paint} />
              </div>
            )
          })
        )
      ) : (
        <div>작품이 없습니다</div>
      )}
    </div>
  )
}
