import React from 'react'
import { useLocation } from 'react-router-dom'

import Layout from 'layout/layout'

export default function Paint() {
  const location = useLocation()
  const { isNew } = location.state

  return (
    <Layout>
      <main>여긴 Paint</main>
    </Layout>
  )
}
