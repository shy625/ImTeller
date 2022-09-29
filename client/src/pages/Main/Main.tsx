/** @jsxImportSource @emotion/react */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Layout from 'layout/layout'
import Timer from 'components/timer'
import { css } from '@emotion/react'
import { fullDisplay } from 'style/commonStyle'

import { useBGM } from 'actions/hooks/useBGM'
import { setModalState } from 'store/modules/setting'

export default function Main() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <Layout>
      <div css={fullDisplay}>
        <button
          onClick={() => {
            navigate('/game')
          }}
        >
          시작하기
        </button>
        <button
          onClick={() => {
            dispatch(setModalState('alertModal'))
          }}
        >
          모달 띄우기
        </button>
        <Timer />
      </div>
    </Layout>
  )
}
