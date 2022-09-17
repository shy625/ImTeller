import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Layout from 'layout/layout'
import user from 'actions/api/user'

export default function Signup(props: any) {
  const [isSignup, setIsSignup] = useState(false)
  const [nickValid, setNickValid] = useState('')
  const currentUser = useSelector((state: any) => state.currentUser)

  useEffect(() => {
    if (props.signup) {
      setIsSignup(true)
    }
  }, [])

  const changeImage = (event) => {
    const image = event.target.files[0]

    const imageTag: any = document.querySelector('#image')
    imageTag.src = URL.createObjectURL(image)
  }

  const resetImage = (event) => {
    event.preventDefault()

    const imageInput: any = document.querySelector('#profileImage')
    imageInput.value = currentUser.profile

    const imageTag: any = document.querySelector('#image')
    imageTag.src = ''
  }

  const deleteImage = (event) => {
    event.preventDefault()

    const imageInput: any = document.querySelector('#profileImage')
    imageInput.value = ''

    const imageTag: any = document.querySelector('#image')
    imageTag.src = ''
  }

  const checkNick = (event) => {
    let nickname = event.target.value
    nickname = nickname.replace(/\s/g, '')

    if (nickname.length > 20) {
      nickname = nickname.slice(0, 20)
    }
    event.target.value = nickname

    if (nickname.length < 5) {
      setNickValid('5자 이상의 닉네임을 지어주세요')
    } else {
      setNickValid('')
    }
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (nickValid) return alert('닉네임 규칙 에러')

    const formdata: any = new FormData()
    const form = document.querySelector('form')
    formdata.append('wallet', currentUser.wallet)
    formdata.append('nickname', form.nickname.value)
    formdata.append('profile', form.profileImage.files[0])

    if (isSignup) {
      user.signup(formdata) // 결과 오면 처리하기
    } else {
      formdata.append('userId', currentUser.userId)
      const ImageTag: any = document.querySelector('#image')
      if (currentUser.profile !== ImageTag.src) {
        formdata.append('isProfileChanged', 'true')
      } else {
        formdata.append('isProfileChanged', '')
      }
      user.profileEdit(formdata) // 결과 오면 처리하기
    }
  }

  return (
    <Layout>
      <main>
        여긴 Signup
        <img id="image" src="" alt="" />
        <form>
          <div>
            <label htmlFor="profileImage">프로필 이미지</label>
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={(event) => {
                changeImage(event)
              }}
            />
            <button
              onClick={(event) => {
                resetImage(event)
              }}
            >
              원상복구하기
            </button>
            <button
              onClick={(event) => {
                deleteImage(event)
              }}
            >
              지우기
            </button>
          </div>
          <div>
            <label htmlFor="nickname">닉네임</label>
            <input
              id="nickname"
              type="text"
              defaultValue={currentUser.nickname || ''}
              placeholder="닉네임"
              required
              onChange={(event) => {
                checkNick(event)
              }}
            />
            {nickValid || null}
          </div>
          <button
            onClick={(event) => {
              onSubmit(event)
            }}
          >
            전송
          </button>
        </form>
      </main>
    </Layout>
  )
}
