import React from 'react'
import { useNavigate } from 'react-router-dom'

import Layout from 'layout/layout'

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
      </main>
    </Layout>
  )
}
