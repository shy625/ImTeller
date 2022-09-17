import React from 'react'
import { useNavigate } from 'react-router-dom'

import Layout from 'layout/layout'

export default function Main() {
  const navigate = useNavigate()

  return (
    <Layout>
      <main>여긴 main</main>
    </Layout>
  )
}
