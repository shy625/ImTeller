/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import deal from 'actions/api/deal'
import { setDealList } from 'store/modules/art'

export default function Search() {
	const dispatch = useDispatch()

	const [keyword, setKeyword] = useState('')
	const [target, setTarget] = useState(0) // 검색 조건. 0작품명, 1제작자, 2소유자
	const [sort, setSort] = useState(0) // 정렬 조건. 0기본순, 1최신순
	const [status, setStatus] = useState(0) // 정렬조건2. 0전체, 1진행중, 2완료

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

	return (
		<div css={box}>
			<div css={line}>
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
				<input css={input} type="text" onChange={(e) => inputFilter(e)} />
				<button css={button} onClick={onSubmit}>
					검색
				</button>
			</div>
			<br />
			<div css={additional}>
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
		</div>
	)
}
const box = css`
	font-family: 'GongGothicMedium';
	width: 500px;
`

const select = css`
	box-sizing: border-box;
	width: 100px;
	padding: 5px;
	font-size: 14px;
	border-radius: 8px;
	margin: 3px;
`
const option = css`
	padding: 5px;
	font-size: 14px;
	color: #fff;
	background: #272822;
`
const input = css`
	width: 100%;
	border: 3px solid #fbfbfb;
	border-right: none;
	padding: 5px;
	height: 20px;
	border-radius: 5px 0 0 5px;
	outline: none;
`
const button = css`
	font-family: 'GmarketSansMedium';
	width: 100px;
	height: 36px;
	border: 1px solid #f7f7f7;
	background: rgb(74, 59, 117);
	text-align: center;
	color: #ececef;
	border-radius: 0 5px 5px 0;
	cursor: pointer;
	font-size: 20px;
`
const line = css`
	display: flex;
	flex-direction: row;
`

const additional = css`
	float: right;
`
