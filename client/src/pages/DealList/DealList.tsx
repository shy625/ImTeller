import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Search from 'pages/DealList/search'
import Layout from 'layout/layout'
import Deal from 'components/deal'

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
			<main>
				<div css={centerCSS}>
					<div css={listWrapper}>
						<div css={nav}>
							<button onClick={onMove}>판매 등록</button>
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
`

const nav = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 30px;
`
const listWrapper = css`
	width: 60%;
`
