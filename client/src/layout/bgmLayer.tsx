import React, { FC, useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const BgmLayer = (props: any) => {
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
      ref.current.pause()
    }
  }, [])

  return (
    <div>
      {props.children}
      <audio autoPlay ref={ref} loop controls></audio>
    </div>
  )
}
