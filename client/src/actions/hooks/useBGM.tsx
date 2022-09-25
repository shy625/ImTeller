import { useEffect, useState } from 'react'

export const useBGM = () => {
  let audio

  useEffect(() => {
    let audio = new Audio('assets/audio/bgm.mp3')
    audio.autoplay = true
    audio.loop = true
    audio.play
  }, [])

  const start = () => {
    audio.play()
  }

  return start
}
