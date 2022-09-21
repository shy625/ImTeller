import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Profile from 'components/profile'
import { setEmail, setLogout } from 'store/modules/user'

export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const currentUser = useSelector((state: any) => state.currentUser)

  const logout = () => {
    dispatch(setLogout())
    dispatch(setEmail(''))
    localStorage.setItem('email', '')
  }

  useEffect(() => {
    if (currentUser.nickname) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [currentUser])

  return (
    <div>
      header
      <div onClick={() => navigate('/')}>로고</div>
      <div onClick={() => navigate('/game')}>게임</div>
      <div onClick={() => navigate('/deal')}>거래소</div>
      <div onClick={() => navigate('/vote')}>출품</div>
      <div onClick={() => navigate('/rank')}>랭킹</div>
      <div onClick={() => navigate('/faq')}>FAQ</div>
      {isLoggedIn ? (
        <>
          <Profile nickname={currentUser.nickname} profile={currentUser.profile} />
          <div onClick={logout}>로그아웃</div>
        </>
      ) : (
        <>
          <div onClick={() => navigate('/login')}>로그인</div>
          <div onClick={() => navigate('/signup')}>회원가입</div>
        </>
      )}
    </div>
  )
}
