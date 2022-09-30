import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setMyPageTab } from 'store/modules/util'

export default function MypageTabNav(props: any) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { setTabNo, isMyMypage } = props

  return (
    <div>
      <div>
        <div
          onClick={() => {
            dispatch(setMyPageTab(0))
          }}
        >
          NFT 카드
        </div>
        {isMyMypage ? (
          <>
            <div
              onClick={() => {
                dispatch(setMyPageTab(1))
              }}
            >
              내 그림
            </div>
            <div
              onClick={() => {
                navigate('/paint', { state: { isNew: true } })
              }}
            >
              그림그리기
            </div>
            <div
              onClick={() => {
                navigate('/profileEdit')
              }}
            >
              회원정보수정
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
