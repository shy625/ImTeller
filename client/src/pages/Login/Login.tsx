import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Layout from 'layout/layout'
import Loading from 'components/loading'
import { useModal } from 'actions/hooks/useModal'
import user from 'actions/api/user'
import { setEmail } from 'store/modules/user'
import { setCurrentUser } from 'store/modules/user'

export default function Login(props: any) {
	const navigate: any = useNavigate()
	const dispatch = useDispatch()

	const [authError, setAuthError] = useState('')
	const [pwFind, setPwFind] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const [setModalState, setModalMsg] = useModal()

	const passwordFilter = (event) => {
		const { value } = event.target
		const filtered = value.replace(/[^0-9a-zA-Z~!@#$%^&*()=|+]/g, '')
		event.target.value = filtered.slice(0, 30)
	}

	const onSubmit = () => {
		setAuthError('')
		const email: any = document.querySelector('#email')
		const password: any = document.querySelector('#password')

		if (!email.value) {
			setModalMsg('이메일을 입력해주세요')
			setModalState('alert')
			return
		}
		if (!password.value) {
			setModalMsg('비밀번호를 입력해주세요')
			setModalState('alert')
			return
		}
		const credentials = {
			email: email.value,
			password: password.value,
		}
		console.log('실행됨')
		console.log(credentials)
		user
			.login(credentials)
			.then((result) => {
				if (result.data.response == '올바른 비밀번호입니다.') {
					localStorage.setItem('email', credentials.email)
					dispatch(setEmail(credentials.email))
					user
						.currentUser()
						.then((result) => {
							console.log(result.data)
							dispatch(setCurrentUser(result.data.response))
							navigate(-1, { replace: true })
						})
						.catch((error) => {
							console.log(error)
						})
				}
			})
			.catch((error) => {
				setAuthError('잘못된 아이디 혹은 비밀번호입니다.')
				console.log('어떤 에러가 나오나')
				console.log(error)
			})
	}

	const sendEmail = () => {
		if (isLoading) return
		const email: any = document.querySelector('#email')

		if (!email.value) {
			setModalMsg('이메일을 입력해주세요')
			setModalState('alert')
			return
		}
		setIsLoading(true)
		const credentials = {
			email: email.value,
		}

		user
			.sendPassword(credentials)
			.then((result) => {
				if (result.data.response == '비밀번호 변경 메일을 전송했습니다.') {
					setModalMsg('이메일 주소로 비밀번호 변경 메일을 전송했습니다. ')
					setModalState('alert')
					setPwFind(false)
				}
				setIsLoading(false)
			})
			.catch((error) => {
				console.log(error)
				setAuthError(error.data)
				setIsLoading(false)
			})
	}

	return (
		<Layout>
			<main>
				<div>
					<label htmlFor="email">Email</label>
					<input type="text" id="email" autoFocus placeholder="이메일를 입력해주세요" />
				</div>
				{pwFind ? (
					<>
						<button onClick={sendEmail}>임시 비밀번호 전송</button>
						{isLoading ? <Loading msg={'전송중입니다.'} /> : null}
					</>
				) : (
					<>
						<div>
							<label htmlFor="password">Password</label>
							<input
								type="password"
								id="password"
								placeholder="비밀번호를 입력해주세요"
								onChange={(e) => {
									passwordFilter(e)
								}}
								onKeyDown={(e) => {
									if (e.key === 'Enter') onSubmit()
								}}
							/>
							{authError ? <p>{authError}</p> : null}
						</div>
						<button onClick={onSubmit}>로그인</button>
					</>
				)}
				<button onClick={() => navigate(-1, { replace: true })}>뒤로가기</button>
				<div
					onClick={() => {
						setPwFind(!pwFind)
					}}
				>
					비밀번호 잃어버렸음 비밀번호 찾기 {pwFind ? '⚫' : '⚪'}
				</div>
			</main>
		</Layout>
	)
}
