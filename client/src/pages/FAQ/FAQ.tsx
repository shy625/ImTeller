import React, { useState } from 'react'

import Layout from 'layout/layout'
import TabNavbar from 'pages/FAQ/tabNavbar'
import TabViewer from 'pages/FAQ/tabViewer'

export default function FAQ() {
  const [tabNo, setTabNo] = useState(0)

  return (
    <Layout>
      <main>
        여긴 FAQ
        <TabNavbar setTabNo={setTabNo} />
        <hr></hr>
        <TabViewer tabNo={tabNo} />
      </main>
    </Layout>
  )
}
