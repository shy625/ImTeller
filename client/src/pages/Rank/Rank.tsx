import { useState } from 'react'

import Layout from 'layout/layout'
import RankTabNav from './rankTabNav'
import RankTabViewer from './rankTabView'

export default function Rank() {
	const [tabNo, setTabNo] = useState(0)
	return (
		<Layout>
			<main>
				여긴 Rank
				<RankTabNav />
				<hr></hr>
				<RankTabViewer tabNo={setTabNo} />
			</main>
		</Layout>
	)
}
