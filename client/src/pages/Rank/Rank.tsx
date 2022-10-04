/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState } from 'react'
import Layout from 'layout/layout'
import RankTabNav from './rankTabNav'
import RankList from './rankList'
import { fullDisplay } from 'style/commonStyle'

export default function Rank() {
	const [tabNo, setTabNo] = useState(0)
	return (
		<Layout>
			<main css={main}>
				<div css={fullDisplay}>
					<div css={box}>
						<RankTabNav></RankTabNav>
						<RankList></RankList>
					</div>
				</div>
			</main>
		</Layout>
	)
}
const main = css`
	display: flex;
	justify-content: center;
`
const box = css`
	display: flex;
	flex-direction: column;
	width: 90% auto;
	//background-color: #854e4e;
`
