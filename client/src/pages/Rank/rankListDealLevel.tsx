/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { rankListProps, levelRankListProps } from './Rank'
export default function rankListDealLevel({ rankList }: { rankList: rankListProps }) {
	const levelRankList: levelRankListProps[] = rankList.levelRankList
	console.log('rankList', typeof rankList)
	console.log(rankList[0])
	return (
		<div css={box}>
			<div css={list}>
				<table>
					<thead>
						<tr>
							<th>순위</th>
							<th>닉네임</th>
							<th>레벨</th>
							<th>플레이 횟수</th>
						</tr>
					</thead>
					<tbody>
						{levelRankList ? (
							levelRankList.map((rank, i) => (
								<tr key={i}>
									<td>{i + 1}위</td>
									<td>{rank.nickname}</td>
									<td>{rank.level}</td>
									<td>{rank.totalGame}</td>
								</tr>
							))
						) : (
							<tr>해당하는 데이터가 없습니다</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}
const box = css`
	display: flex;
	flex-direction: column;
	margin: 2rem;
`

const list = css`
	width: 100%;
	height: 70vh;
	/* background-color: rgba(239, 238, 245, 0.3); */
	border-radius: 1rem;
	box-shadow: 2px 2px 16px;
	margin-bottom: 1rem;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-start;
	color: white;
	table {
		margin-top: 15px;
		width: 100%;
	}
	th {
		line-height: 6vh;
		border-bottom: 1px solid #aaa;
		font-family: 'GmarketSansMedium';
		font-size: 20px;
	}
	tbody {
		font-family: 'GmarketSansMedium';
	}
	td {
		line-height: 5.5vh;
		font-size: 15px;
		text-align: center;
	}
`
