import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

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
				<Search />
				<button onClick={onMove}>판매 등록</button>
				<div>
					{dealList.map((deal) => (
						<Deal deal={deal} key={deal.dealId} />
					))}
				</div>
			</main>
		</Layout>
	)
}
