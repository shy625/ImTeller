import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Layout from 'layout/layout'
import { useModal } from 'actions/hooks/useModal'
import user from 'actions/api/user'
import Loading from 'components/loading'

export default function Signup(props: any) {
	const navigate = useNavigate()

	const [nickValid, setNickValid] = useState('')
	const [authError, setAuthError] = useState('')
	const [emailChecked, setEmailChecked] = useState(false)
	const [nickChecked, setNickChecked] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const [setModalState, setModalMsg] = useModal('')

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
		if (!email.value) {
			setModalMsg('이메일을 입력해 주세요')
			setModalState('alert')
			return
		}

		const data = { email: email.value }
		user
			.checkEmail(data)
			.then((result) => {
				console.log(result)
				if (result.data.response === '사용가능한 이메일입니다.') {
					setEmailChecked(true)
				}
			})
			.catch((error) => {
				console.error(error)
			})
	}

	const checkNick = () => {
		if (nickValid) {
			setModalMsg('닉네임은 5글자 이상이어야 합니다')
			setModalState('alert')
			return
		}
		const nickname: any = document.querySelector('#nickname')
		if (!nickname.value) {
			setModalMsg('닉네임을 입력해 주세요')
			setModalState('alert')
			return
		}

		const data = { nickname: nickname.value }
		user
			.checkNickname(data)
			.then((result) => {
				console.log(result)
				if (result.data.response === '사용가능한 닉네임입니다.') {
					setNickChecked(true)
				}
			})
			.catch((error) => {
				console.error(error)
			})
	}

	const onSubmit = (event) => {
		event.preventDefault()
		if (isLoading) return
		setIsLoading(true)

		const email: any = document.querySelector('#email')
		const nickname: any = document.querySelector('#nickname')
		if (!emailChecked) {
			setModalMsg('이메일 중복을 체크해주세요')
			setModalState('alert')
			setIsLoading(false)
			return
		}
		if (!nickChecked) {
			setModalMsg('닉네임 중복을 체크해주세요')
			setModalState('alert')
			setIsLoading(false)
			return
		}

		const credentials = {
			email: email.value,
			nickname: nickname.value,
		}

		user
			.signup(credentials)
			.then((result) => {
				if (result.data.response === '가입 성공') {
					alert('회원가입에 성공했습니다. 이메일을 확인해 주세요')
					setIsLoading(false)
					navigate('/', { replace: true })
				}
			})
			.catch((error) => {
				setIsLoading(false)
				console.error(error)
			})
	}

	return (
		<Layout>
			<main>
				여긴 Signup
				<div>
					<label htmlFor="email">이메일</label>
					<input id="email" type="email" autoFocus onChange={emailFilter} placeholder="이메일" />
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
				{isLoading ? (
					<Loading
						msg={
							'입력하신 이메일로 임시 비밀번호를 전송하는 중입니다. \n전송이 완료된 후 임시 비밀번호로 로그인해주세요'
						}
					/>
				) : null}
				{authError}
			</main>
		</Layout>
	)
}
