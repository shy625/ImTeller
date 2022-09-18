import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'

import { setWallet } from 'store/modules/user'

import Profile from 'components/profile'

const injected = new InjectedConnector({ supportedChainIds: [31221, 202112031219] })

export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const currentUser = useSelector((state: any) => state.currentUser)

  const {
    chainId, // dapp에 연결된 지갑의 connector 값
    library, // web3 provider
    account, // account address
    active, // 유저가 로그인 된 상태인지
    activate, // 지갑 연결 수행 함수
    deactivate, // 지갑 연결 해제 수행 함수
  } = useWeb3React()

  useEffect(() => {
    if (currentUser.wallet) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [currentUser])

  useEffect(() => {
    dispatch(setWallet(account))
  }, [active])

  const handleConnect = async () => {
    try {
      // 사용자가 아닌 React가 metamask 연결을 끊을 순 없고, 라이브러리 객체를 못쓰게함
      if (active) {
        deactivate()
        dispatch(setWallet(''))
        return
      }

      if (window.ethereum) {
        activate(injected)
      } else {
        const installMetaAlert = confirm('메타마스크 설치하셈')
        if (installMetaAlert) {
          window.open('https://metamask.io/download/', '_blank')
        }
      }
    } catch (error) {
      console.error('handleConnect 함수의 에러', error)
    }
  }

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
          <div onClick={handleConnect}>로그아웃</div>
        </>
      ) : (
        <>
          <div onClick={handleConnect}>로그인</div>
          <div onClick={() => navigate('/signup')}>회원가입</div>
        </>
      )}
    </div>
  )
}
