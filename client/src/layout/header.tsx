/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'

import Profile from 'components/profile'
import Setting from 'components/setting'

import { setCurrentUser, setEmail, setLogout } from 'store/modules/user'
import user from 'actions/api/user'

import logo from 'assets/image/logo2.png'
import { textBtn } from 'style/commonStyle'

export default function Header() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const currentUser = useSelector((state: any) => state.currentUser)

	const logout = () => {
		dispatch(setLogout())
		dispatch(setEmail(''))
		localStorage.setItem('email', '')
	}

	useEffect(() => {
		user
			.currentUser()
			.then((result) => {
				dispatch(setCurrentUser(result.data))
			})
			.catch((error) => {
				console.log(error)
			})
		let email = localStorage.getItem('email')
		if (email) {
			dispatch(setEmail(email))
		}
	}, [])

	return (
		<div css={headerCss}>
			<div>
				{/* <img src={logo} alt="로고" css={logoIconCss} /> */}
				<div css={logoTitleCss} onClick={() => navigate('/')}>
					ImTeller
				</div>
			</div>
			<div css={navBarCss}>
				<div onClick={() => navigate('/game')} css={textBtn}>
					게임
				</div>
				<div onClick={() => navigate('/deal')} css={textBtn}>
					거래소
				</div>
				<div onClick={() => navigate('/vote')} css={textBtn}>
					출품
				</div>
				<div onClick={() => navigate('/rank')} css={textBtn}>
					랭킹
				</div>
				<div onClick={() => navigate('/faq')} css={textBtn}>
					FAQ
				</div>
				{currentUser.nickname ? (
					<div css={loginCss}>
						<Profile nickname={currentUser.nickname} profile={currentUser.profile} />
						<div onClick={logout} css={textBtn}>
							로그아웃
						</div>
					</div>
				) : (
					<div css={loginCss}>
						<div onClick={() => navigate('/login')} css={loginBtnCss}>
							로그인
						</div>
						<div onClick={() => navigate('/signup')} css={loginBtnCss}>
							회원가입
						</div>
					</div>
				)}
				<Setting />
			</div>
		</div>
	)
}
const headerCss = css({
	display: 'flex',
	color: 'white',
	alignItems: 'center',
	fontFamily: 'LeferiPoint-WhiteObliqueA',
	justifyContent: 'space-between',
})
const navBarCss = css({
	display: 'flex',
	width: 800,
	margin: 10,
	justifyContent: 'space-between',
	alignItems: 'center',
})
const loginCss = css({
	display: 'flex',
	alignItems: 'center',
	marginRight: 20,
})
const loginBtnCss = css({
	margin: 5,
	cursor: "url('https://imtellercard.s3.ap-northeast-2.amazonaws.com/brushClick.png'), auto",
})
const logoTitleCss = css({
	fontFamily: 'Yeongdo-Rg',
	fontSize: 30,
	textAlign: 'center',
	margin: 20,
	marginLeft: 40,
	cursor: "url('https://imtellercard.s3.ap-northeast-2.amazonaws.com/brushClick.png'), auto",
})
