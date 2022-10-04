/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState } from 'react'
import Layout from 'layout/layout'
import RankTabNav from './rankTabNav'
import RankList from './rankList'
import { fullDisplay } from 'style/commonStyle'

export default function Rank() {
	const [tabNo, setTabNo] = useState(0)
	const tabs = ['오늘의 거래', '승률', '레벨', '이달의 NFT']
	return (
		<Layout>
			<main css={main}>
				<div css={fullDisplay}>
					<div css={box}>
						<RankTabNav tabNo={tabNo} setTabNo={setTabNo} tabs={tabs}></RankTabNav>
						<RankList tabNo={tabNo} tabs={tabs}></RankList>
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
	width: 80vw;
	//background-color: #854e4e;
`
