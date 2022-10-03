import React, { useState } from 'react'

import RankLevelTab from './rankLevelTab'
import RankMonthlyTab from './rankMonthlyTab'
import RankNFTTab from './rankNFTTab'
import RankWinTab from './rankWinTab'

export default function RankTabViewer(props: any) {
	const { tabNo } = props
	const [page, setPage] = useState([0, 1])
	const tabs = {
		0: <RankNFTTab page={page} setPage={setPage} />,
		1: <RankWinTab page={page} setPage={setPage} />,
		2: <RankLevelTab page={page} setPage={setPage} />,
		3: <RankMonthlyTab page={page} setPage={setPage} />,
	}

	const goForw = () => {
		setPage([(page[1] + page[0] - 1) % page[1], page[1]])
	}

	const goBack = () => {
		setPage([(page[0] + 1) % page[1], page[1]])
	}

	return (
		<div>
			<div>
				<div onClick={goForw}>앞으로</div>
				{tabs[tabNo]}
				<div onClick={goBack}>뒤로</div>
			</div>
			<div>
				{[...Array(page[1])].map((_, idx) => {
					if (idx == page[0]) {
						return <div key={idx}>⚫</div>
					}
					return <div key={idx}>⚪</div>
				})}
			</div>
		</div>
	)
}
