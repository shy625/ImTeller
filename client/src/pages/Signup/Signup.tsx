import React, { useState, useEffect } from 'react'

import Layout from 'layout/layout'
import user from 'actions/api/user'

export default function Signup(props: any) {
  const [nickValid, setNickValid] = useState('')
  const [authError, setAuthError] = useState('')
  const [emailChecked, setEmailChecked] = useState(false)
  const [nickChecked, setNickChecked] = useState(false)

  const nickFilter = (event) => {
    setNickChecked(false)

    let nickname = event.target.value
    nickname = nickname.replace(/[^a-z|A-Z|0-9|ㄱ-ㅎ|가-힣]/g, '')
    if (nickname.length < 5) {
      setNickValid('5자 이상의 닉네임을 지어주세요')
    } else if (nickname.length > 20) {
      nickname = nickname.slice(0, 20)
    } else {
      setNickValid('')
    }
    event.target.value = nickname
  }

  const emailFilter = () => {
    setEmailChecked(false)
  }

  const checkEmail = () => {
    const email: any = document.querySelector('#email')
    if (!email.value) return alert('이메일 입력하셈')

    const data = { email: email.value }
    user
      .checkEmail(data)
      .then((result) => {
        if (result.data == '사용가능한 이메일입니다.') {
          setEmailChecked(true)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const checkNick = () => {
    if (nickValid) return alert('닉네임 규칙지키세요')
    const nickname: any = document.querySelector('#nickname')
    if (!nickname.value) return alert('닉네임 입력하셈')

    const data = { nickname: nickname.value }
    user
      .checkNickname(data)
      .then((result) => {
        console.log(result)
        if (result.data == '사용가능한 닉네임입니다.') {
          setNickChecked(true)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const email: any = document.querySelector('#email')
    const nickname: any = document.querySelector('#nickname')
    if (!emailChecked) return alert('이메일 중복체크하셈')
    if (!nickChecked) return alert('닉네임 중복체크하셈')

    const credentials = {
      email: email.value,
      nickname: nickname.value,
    }

    user
      .signup(credentials)
      .then((result) => {
        console.log(result)
        // 결과오면 처리하기. 로그인페이지로 보내기 등
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Layout>
      <main>
        여긴 Signup
        <div>
          <label htmlFor="email">이메일</label>
          <input id="email" type="email" onChange={emailFilter} placeholder="이메일" />
          <button onClick={checkEmail}>이메일 중복 체크</button>
          {emailChecked ? '✅' : null}
        </div>
        <div>
          <label htmlFor="nickname">닉네임</label>
          <input
            id="nickname"
            type="text"
            placeholder="닉네임"
            onChange={(event) => {
              nickFilter(event)
            }}
          />
          <button onClick={checkNick}>닉네임 중복 체크</button>
          {nickChecked ? '✅' : null}
          {nickValid}
        </div>
        <button onClick={onSubmit}>회원가입</button>
        {authError}
      </main>
    </Layout>
  )
}
