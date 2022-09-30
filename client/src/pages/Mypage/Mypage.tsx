import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Layout from 'layout/layout'
import user from 'actions/api/user'
import art from 'actions/api/art'

import MypageTabNav from 'pages/Mypage/mypageTabNav'
import CardList from 'components/cardList'

import { setUserDetail } from 'store/modules/user'
import { setCardList, setPaintList } from 'store/modules/art'

export default function Mypage() {
  const dispatch = useDispatch()
  const { nick } = useParams()
  const { nickname, profile, exp, win, lose, createdDT } = useSelector(
    (state: any) => state.userDetail,
  )
  const currentUser = useSelector((state: any) => state.currentUser)
  const paintList = useSelector((state: any) => state.paintList)
  const cardList = useSelector((state: any) => state.cardList)

  const [isMyMypage, setIsMyMypage] = useState(false)
  const [tabNo, setTabNo] = useState(0)

  useEffect(() => {
    if (nick === currentUser.nickname) setIsMyMypage(true)
  })

  useEffect(() => {
    user
      .userDetail({ nickname: nick })
      .then((result) => {
        dispatch(setUserDetail(result.data))
      })
      .catch((error) => {
        console.error(error)
      })
    // art
    //   .cardList({ nickname: nick })
    //   .then((result) => {
    //     console.log(result.data)
    //     dispatch(setCardList(result.data))
    //   })
    //   .catch((error) => {
    //     console.error(error)
    //   })
  }, [nick, nickname])

  // useEffect(() => {
  //   if (isMyMypage) {
  //     art
  //       .paintList({ nickname: nick })
  //       .then((result) => {
  //         dispatch(setPaintList(result.data))
  //       })
  //       .catch((error) => {
  //         console.error(error)
  //       })
  //   }
  // }, [isMyMypage])

  const tabs = {
    0: <CardList cardList={cardList} isCard={true} />,
    1: <CardList cardList={paintList} isCard={false} type={0} />,
  }

  return (
    <Layout>
      <main>
        여긴 mypage
        <div>
          <img src={profile} alt="" />
          <div>{nickname}</div>
          <div>Lv. {Math.floor(exp / 50) + 1}</div>
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
