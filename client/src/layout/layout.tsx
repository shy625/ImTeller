import React from 'react'
import Header from './header'
import Footer from './footer'

export default function Layout(props: any) {
  return (
    <div>
      <Header />
      <hr />
      {props.children}
      <hr />
      <Footer />
    </div>
  )
}
