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
`
