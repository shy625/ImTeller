import { css } from '@emotion/react'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import deal from 'actions/api/deal'
import { setDealList } from 'store/modules/art'

export default function Search() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [keyword, setKeyword] = useState('')
	const [target, setTarget] = useState(0) // 검색 조건. 0작품명, 1제작자, 2소유자
	const [sort, setSort] = useState(0) // 정렬 조건. 0기본순, 1최신순
	const [status, setStatus] = useState(0) // 정렬조건2. 0전체, 1진행중, 2완료

	const currentUser = useSelector((state: any) => state.currentUser)

	useEffect(() => {
		onSubmit()
	}, [])

	const inputFilter = (event) => {
		let keyword = event.target.value
		keyword = keyword.replace(/[^a-z|A-Z|0-9|ㄱ-ㅎ|가-힣]/g, '') // uri에 / 같은게 들어가면 안됨
		if (keyword.length > 20) {
			keyword = keyword.slice(0, 20)
		}
		event.target.value = keyword
		setKeyword(event.target.value)
	}

	const onSubmit = () => {
		// console.log('더미데이터가 완벽하지 않아서 구매하기 누르면 없는정보 참조로 에러남')
		const params = {
			keyword,
			target,
			sort,
			status,
		}
		deal.dealList(params).then((result) => {
			console.log(result.data.response)
			dispatch(setDealList(result.data.response))
		})
	}
	const onMove = () => {
		if (!currentUser.nickname) return navigate('/login')
		return navigate('/deal/register')
	}
	return (
		<div css={box}>
			<div css={line}>
				<div id="searchBox">
					<input css={input} type="text" onChange={(e) => inputFilter(e)} />
					<button css={button} onClick={onSubmit}>
						검색
					</button>
				</div>
				<div className="filter">
					<div>
						<select css={select} name="target" onChange={(e: any) => setTarget(e.target.value)}>
							<option css={option} value={0}>
								작품명
							</option>
							<option css={option} value={1}>
								제작자
							</option>
							<option css={option} value={2}>
								판매자
							</option>
						</select>
						<select css={select} name="sort" onChange={(e: any) => setSort(e.target.value)}>
							<option css={option} value={0}>
								최신순
							</option>
							<option css={option} value={1}>
								높은가격순
							</option>
							<option css={option} value={2}>
								낮은가격순
							</option>
							<option css={option} value={3}>
								남은시간순
							</option>
						</select>
						<select css={select} name="status" onChange={(e: any) => setStatus(e.target.value)}>
							<option css={option} value={0}>
								전체
							</option>
							<option css={option} value={1}>
								경매진행중
							</option>
							<option css={option} value={2}>
								경매완료
							</option>
						</select>
					</div>
					<button css={button} onClick={onMove}>
						판매등록
					</button>
				</div>
			</div>
		</div>
	)
}
const box = css`
	font-family: 'GongGothicMedium';
	width: 100%;
	display: flex;
	justify-content: center;
	#searchBox {
		display: flex;
		align-items: center;
	}
	.filter {
		margin-top: 30px;
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
`

const select = css`
	font-family: 'GmarketSansMedium';
	border-radius: 50px;
	border-color: #c9c9c9;
	padding: 8px;
	margin: 0px 10px 0px 10px;
`
const option = css`
	/* padding: 5px; */
	font-size: 14px;
	color: #fff;
	background: #272822;
`
const input = css`
	width: 300px;
	font-family: 'GmarketSansMedium';
	border-radius: 50px;
	border-color: #c9c9c9;
	padding: 8px;
	margin: 3px 10px 10px 10px;
`
const button = css`
	outline: 'none';
	cursor: url('https://imtellercard.s3.ap-northeast-2.amazonaws.com/brushClick.png'), auto;
	border: 0px;
	padding: 6px 20px 6px 20px;
	margin: 0px 10px 5px 10px;
	color: #1b5198;
	background-color: #d1e4ff;
	border-radius: 40px;
	font-size: 15px;
	width: 110px;
	height: 35px;
	font-family: 'GongGothicMedium';
`
const line = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`
