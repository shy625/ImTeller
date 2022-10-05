import { useDispatch } from 'react-redux'
import Layout from 'layout/layout'
import FaqTabViewer from 'pages/FAQ/faqViewer'
import { setMainTab } from 'store/modules/util'

export default function FAQ() {
	const dispatch = useDispatch()
	dispatch(setMainTab('faq'))
	return (
		<Layout>
			<main>
				<FaqTabViewer />
			</main>
		</Layout>
	)
}
