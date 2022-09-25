import React from 'react'
import { useNavigate } from 'react-router-dom'

import Layout from 'layout/layout'
import Timer from 'components/timer'

export default function Main() {
  const navigate = useNavigate()

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
        <Timer />
      </main>
    </Layout>
  )
}
