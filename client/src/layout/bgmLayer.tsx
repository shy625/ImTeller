import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function BgmLayer(props: any) {
  const ref: any = useRef()

  const bgmSrc = useSelector((state: any) => state.bgmSrc)
  const volume = useSelector((state: any) => state.volume)
  const isBgmOn = useSelector((state: any) => state.isBgmOn)

  useEffect(() => {
    if (isBgmOn) {
      ref.current.load()
    } else {
      ref.current.pause()
    }
  }, [isBgmOn])

  useEffect(() => {
    ref.current.volume = volume / 100
  }, [volume])

  useEffect(() => {
    ref.current.src = bgmSrc
  }, [bgmSrc])

  useEffect(() => {
    return () => {
      if (ref.current) {
        ref.current.pause()
      }
    }
  }, [])

  return (
    <div>
      {props.children}
      <audio ref={ref} loop controls></audio>
    </div>
  )
}
