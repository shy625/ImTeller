/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'

import Layout from 'layout/layout'
import user from 'actions/api/user'
import art from 'actions/api/art'

import MypageTabNav from 'pages/Mypage/mypageTabNav'
import CardList from 'components/cardList'

import { setUserDetail } from 'store/modules/user'
import { setCardList, setPaintList } from 'store/modules/art'
import { useModal } from 'actions/hooks/useModal'

import pencil from '../../assets/image/pencil.webp'
import { imgIcon, fullDisplay } from 'style/commonStyle'

export default function Mypage() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { nick } = useParams()
	const { nickname, profile, exp, win, lose, wallet, createdDT } = useSelector(
		(state: any) => state.userDetail,
	)
	const currentUser = useSelector((state: any) => state.currentUser)
	const paintList = useSelector((state: any) => state.paintList)
	const cardList = useSelector((state: any) => state.cardList)
	const myPageTab = useSelector((state: any) => state.myPageTab)

	const [isMyMypage, setIsMyMypage] = useState(false)
	const [setModalState, setModalMsg] = useModal()

	useEffect(() => {
		if (nick === currentUser.nickname) setIsMyMypage(true)
	})

	useEffect(() => {
		user
			.userDetail({ nickname: nick })
			.then((result) => {
				dispatch(setUserDetail(result.data.response))
			})
			.catch((error) => {
				console.error(error)
			})
	}, [nick, nickname])

	useEffect(() => {
		if (myPageTab === 0) {
			art
				.cardList({ nickname: nick })
				.then((result) => {
					console.log(result.data)
					dispatch(setCardList(result.data.response))
				})
				.catch((error) => {
					console.error(error)
				})
		}
	}, [myPageTab])

	useEffect(() => {
		if (isMyMypage) {
			art
				.paintList({ nickname: nick })
				.then((result) => {
					dispatch(setPaintList(result.data.response))
				})
				.catch((error) => {
					console.error(error)
				})
		}
	}, [isMyMypage])

	const tabs = {
		0: <CardList cardList={cardList} isCard={true} type={0} />,
		1: <CardList cardList={paintList} isCard={false} type={0} />,
	}

	return (
		<Layout>
			<main css={fullDisplay}>
				<div css={centerCSS}>
					<div css={profileCSS}>
						<img src={profile} alt="" css={profileImgCSS} />
						<div>
							<div className="nickname">
								<div className="name">{nickname}</div>
								{isMyMypage ? (
									<div
										onClick={() => {
											navigate('/profileEdit')
										}}
									>
										<img src={pencil} alt="연필" css={imgIcon} />
									</div>
								) : null}
							</div>
							<div className="info">
								<div>Lv. {Math.floor(exp / 50) + 1}</div>
								<div>
									{win} 승 {lose} 패. 승률:{' '}
									{win + lose === 0 ? 0 : ((win / (win + lose)) * 100).toFixed(1)}%
								</div>
								<div>
									{isMyMypage ? (
										wallet ? (
											<>
												<label htmlFor="wallet">등록된 지갑주소 :</label>
												<input id="wallet" value={currentUser.wallet} disabled></input>
											</>
										) : (
											<button onClick={() => setModalState('addWallet')}>지갑 등록하기</button>
										)
									) : null}
								</div>
							</div>
						</div>
					</div>
				</div>
				<MypageTabNav isMyMypage={isMyMypage} />
				<div css={centerCSS}>{tabs[myPageTab]}</div>
			</main>
		</Layout>
	)
}
const centerCSS = css`
	margin-top: 20px;
	display: flex;
	justify-content: center;
`
const profileImgCSS = css`
	width: 150px;
	border-radius: 50%;
	margin: 50px 50px 30px 10px;
`
const profileCSS = css`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	color: white;
	width: 60%;
	.nickname {
		font-family: 'GongGothicMedium';
		font-size: 25px;
		margin-bottom: 10px;
		display: flex;
		align-items: center;
	}
	.name {
		margin-right: 10px;
	}
	.info {
		font-family: 'GmarketSansMedium';
	}
	input {
		background-color: transparent;
		font-family: 'GmarketSansMedium';
		color: white;
		border: none;
		margin-left: 20px;
	}
`
