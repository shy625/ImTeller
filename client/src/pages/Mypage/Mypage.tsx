import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Layout from 'layout/layout'
import user from 'actions/api/user'

import { setUserDetail } from 'store/modules/user'
import MypageTabNav from 'pages/Mypage/mypageTabNav'
import CardList from 'components/cardList'
import { stat } from 'fs'

export default function Mypage() {
  const dispatch = useDispatch()
  const { nick } = useParams()
  const { nickname, profile, exp, win, lose, createdDT, updatedDT, cardList } = useSelector(
    (state: any) => state.userDetail,
  )
  const currentUser = useSelector((state: any) => state.currentUser)

  const [isMyMypage, setIsMyMypage] = useState(false)
  const [tabNo, setTabNo] = useState(0)
  const [paintList, setPaintList] = useState([])

  useEffect(() => {
    user
      .userDetail(nick)
      .then((result) => {
        dispatch(setUserDetail(result))
      })
      .catch((error) => {
        console.error(error)
      })

    if (nick === currentUser.nickname) {
      setIsMyMypage(true)
    }
  }, [nick, nickname])

  const tabs = {
    0: <CardList cardList={cardList} />,
    1: <CardList cardList={paintList} />,
  }

  return (
    <Layout>
      <main>
        여긴 mypage
        <div>
          <img src={profile} alt="" />
          <div>{nickname}</div>
          <div>Lv. {Math.floor(exp / 100)}</div>
          <div>
            {win} 승 {lose} 패. 승률: {((win / (win + lose)) * 100).toFixed(1)}%
          </div>
        </div>
        <MypageTabNav setTabNo={setTabNo} isMyMypage={isMyMypage} />
        {tabs[tabNo]}
      </main>
    </Layout>
  )
}
