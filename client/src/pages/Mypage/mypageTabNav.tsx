import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function MypageTabNav(props: any) {
  const navigate = useNavigate()

  const { setTabNo, isMyMypage } = props

  return (
    <div>
      <div>
        <div
          onClick={() => {
            setTabNo(0)
          }}
        >
          NFT 카드
        </div>
        {isMyMypage ? (
          <>
            <div
              onClick={() => {
                setTabNo(1)
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
          </>
        ) : null}
      </div>
    </div>
  )
}
