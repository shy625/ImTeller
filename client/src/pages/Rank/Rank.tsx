/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState } from 'react'

import Layout from 'layout/layout'
import RankTabNav from './rankTabNav'
import RankList from './rankList'

export default function Rank() {
	const [tabNo, setTabNo] = useState(0)
	return (
		<Layout>
			<div css={box}>
				<RankTabNav></RankTabNav>
				<RankList></RankList>
			</div>
		</Layout>
	)
}
const box = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 60%;
	//border: 3px solid rgb(43, 27, 90);
	background-color: rgb(43, 27, 90, 0.3);
	border-radius: 10px;
	box-shadow: 5px 5px 20px;
`
