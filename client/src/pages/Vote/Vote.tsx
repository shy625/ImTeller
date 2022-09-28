import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Layout from 'layout/layout'
import VoteCard from 'pages/Vote/voteCard'

import vote from 'actions/api/vote'

export default function Vote() {
  const dispatch = useDispatch()

  const paintList = useSelector((state: any) => state.paintList)

  useEffect(() => {
    vote.paintList().then((result) => {
      console.log(result.data)
    })
  }, [])

  return (
    <Layout>
      <main>
        <div>
          당신의 카드에 투표하세요!
          <button>지난 투표 결과 확인</button>
          <button>나도 출품하기</button>
        </div>
        <div>
          {paintList.map((paint) => (
            <VoteCard paint={paint} key={paint.paintId} />
          ))}
        </div>
      </main>
    </Layout>
  )
}
