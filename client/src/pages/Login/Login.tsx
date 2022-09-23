import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Layout from 'layout/layout'
import user from 'actions/api/user'
import { setEmail } from 'store/modules/user'

export default function Login(props: any) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [authError, setAuthError] = useState('')
  const [pwFind, setPwFind] = useState(false)

  const onSubmit = () => {
    const email: any = document.querySelector('#email')
    const password: any = document.querySelector('#password')

    if (!email.value) return alert('이메일 입력하셈')
    if (!password.value) return alert('비밀번호 입력하셈')

    const credentials = {
      email: email.value,
      password: password.value,
    }

    user
      .login(credentials)
      .then((result) => {
        if (result.data === '올바른 비밀번호입니다.') {
          dispatch(setEmail(credentials.email))
          localStorage.setItem('email', credentials.email)
          navigate('/')
        }
      })
      .catch((error) => {
        setAuthError(error)
        console.log(error)
      })
  }

  const sendEmail = () => {
    const email: any = document.querySelector('#email')

    if (!email.value) return alert('이메일 입력하셈')

    const credentials = {
      email: email.value,
    }

    user // 사실 요청 한번 보내면 응답 올 때까지 재클릭 막아야함
      .sendPassword(credentials)
      .then((result) => {
        if (result.data == '비밀번호 변경 메일을 전송했습니다.') {
          alert('이메일확인해보면 비번갔음')
          setPwFind(false)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Layout>
      <main>여긴 Login</main>

      <div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" autoFocus placeholder="이메일를 입력해주세요" />
        </div>
        {pwFind ? (
          <button onClick={sendEmail}>임시 비밀번호 전송</button>
        ) : (
          <>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="비밀번호를 입력해주세요" />
              {authError ? <p>{authError}</p> : null}
            </div>
            <button onClick={onSubmit}>로그인</button>
            {authError}
          </>
        )}

        <div
          onClick={() => {
            setPwFind(!pwFind)
          }}
        >
          비밀번호 잃어버렸음 비밀번호 찾기 {pwFind ? '⚫' : '⚪'}
        </div>
      </div>
    </Layout>
  )
}
