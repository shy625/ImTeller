import { useState } from 'react'

import Layout from 'layout/layout'
import FaqTabViewer from 'pages/FAQ/faqViewer'

export default function FAQ() {
	return (
		<Layout>
			<main>
				<FaqTabViewer />
			</main>
		</Layout>
	)
}
