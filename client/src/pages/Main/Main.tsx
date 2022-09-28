import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Layout from 'layout/layout'
import Timer from 'components/timer'

import { useBGM } from 'actions/hooks/useBGM'
import { setModalState } from 'store/modules/util'

export default function Main() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <Layout>
      <main>
        여긴 main
        <button
          onClick={() => {
            navigate('/game')
          }}
        >
          시작하기
        </button>
        <button
          onClick={() => {
            dispatch(setModalState('setting'))
          }}
        >
          모달 띄우기
        </button>
        <Timer />
      </main>
    </Layout>
  )
}
