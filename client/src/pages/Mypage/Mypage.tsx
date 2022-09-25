import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Layout from 'layout/layout'
import user from 'actions/api/user'
import art from 'actions/api/art'

import { setUserDetail } from 'store/modules/user'
import MypageTabNav from 'pages/Mypage/mypageTabNav'
import CardList from 'components/cardList'

export default function Mypage() {
  const dispatch = useDispatch()
  const { nick } = useParams()
  const { nickname, profile, exp, win, lose, createdDT } = useSelector(
    (state: any) => state.userDetail,
  )
  const currentUser = useSelector((state: any) => state.currentUser)

  const [isMyMypage, setIsMyMypage] = useState(false)
  const [tabNo, setTabNo] = useState(0)
  const [cardList, setCartList] = useState([])
  const [paintList, setPaintList] = useState([])

  useEffect(() => {
    if (nick === currentUser.nickname) {
      setIsMyMypage(true)
    }

    user
      .userDetail({ nickname: nick })
      .then((result) => {
        dispatch(setUserDetail(result.data))
      })
      .catch((error) => {
        console.error(error)
      })

    art.cardList(nick).then((result) => {
      setCartList(result.data.cardList)
    }) //
  }, [nick, nickname])

  useEffect(() => {
    if (isMyMypage) {
      art.paintList().then((result) => {
        setPaintList(result.data.paintList)
      }) //
    }
  }, [isMyMypage])

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
          <div>Lv. {Math.floor(exp / 100) + 1}</div>
          <div>
            {win} 승 {lose} 패. 승률:{' '}
            {win + lose === 0 ? 0 : ((win / (win + lose)) * 100).toFixed(1)}%
          </div>
        </div>
        <hr />
        <MypageTabNav setTabNo={setTabNo} isMyMypage={isMyMypage} />
        <hr />
        {tabs[tabNo]}
      </main>
    </Layout>
  )
}
