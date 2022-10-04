import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Search from 'pages/DealList/search'
import Layout from 'layout/layout'
import Deal from 'components/deal'
import { fullDisplay } from 'style/commonStyle'

export default function DealList() {
	const navigate = useNavigate()

	const dealList = useSelector((state: any) => state.dealList)
	const currentUser = useSelector((state: any) => state.currentUser)

	const onMove = () => {
		if (!currentUser.nickname) return navigate('/login')
		return navigate('/deal/register')
	}

	return (
		<Layout>
			<main css={fullDisplay}>
				<div css={centerCSS}>
					<div css={listWrapper}>
						<div css={nav}>
							<button css={button} onClick={onMove}></button>
							<Search />
						</div>
						<div css={centerCSS}>
							{dealList.map((deal: any) => (
								<Deal deal={deal} key={deal.dealId} />
							))}
						</div>
					</div>
				</div>
			</main>
		</Layout>
	)
}
const centerCSS = css`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	font-family: 'GongGothicMedium';
`

const nav = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 30px;
`
const listWrapper = css`
	width: 80%;
`

const button = css`
	font-family: 'GmarketSansMedium';
	outline: none;
	height: 40px;
	text-align: center;
	width: 130px;
	border-radius: 40px;
	border: 1px solid white;
	color: #f9f6f6;
	background: #271975;
	letter-spacing: 1px;
	text-shadow: 0;
	font: {
		size: 12px;
		weight: bold;
	}
	cursor: pointer;
	transition: all 0.25s ease;
	&:hover {
		font-family: 'GongGothicMedium';
		color: black;
		background: #3d27bd;
		border: 2px solid black;
	}
	&:active {
		//letter-spacing: 2px;
		letter-spacing: 2px;
	}
	&:after {
		content: '판매등록';
	}
`
const search = css``
