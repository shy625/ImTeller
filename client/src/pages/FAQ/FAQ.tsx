import { css } from '@emotion/react'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import Layout from 'layout/layout'
import FaqNavBar from 'pages/FAQ/FaqNavBar'
import FaqTabViewer from 'pages/FAQ/FaqTabViewer'
import GameDetail from 'pages/FAQ/GameDetail'
import ItemDetail from 'pages/FAQ/ItemDetail'
import ArtDetail from 'pages/FAQ/ArtDetail'
import NFTDetail from 'pages/FAQ/NFTDetail'
import { setMainTab } from 'store/modules/util'
import { fullDisplay } from 'style/commonStyle'

export default function FAQ() {
	const [faqTab, setFaqTab] = useState('video')
	const dispatch = useDispatch()
	dispatch(setMainTab('faq'))
	return (
		<Layout>
			<main css={Main}>
				<div css={fullDisplay}>
					<div css={box}>
						<FaqNavBar faqTab={faqTab} setFaqTab={setFaqTab} />
						<div className="detail">
							{faqTab === 'video' && <FaqTabViewer />}
							{faqTab === 'game' && <GameDetail />}
							{faqTab === 'item' && <ItemDetail />}
							{faqTab === 'art' && <ArtDetail />}
							{faqTab === 'nft' && <NFTDetail />}
						</div>
					</div>
				</div>
			</main>
		</Layout>
	)
}

const Main = css`
	height: 100%;
	display: flex;
	justify-content: center;
`

const box = css`
	display: flex;
	flex-direction: column;
	width: 80vw;

	.detail {
		height: 70vh;
		background-color: rgba(239, 238, 245, 0.3);
		border-radius: 1rem;
		box-shadow: 2px 2px 16px;
		margin-bottom: 1rem;
	}
`
