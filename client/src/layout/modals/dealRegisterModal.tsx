import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'

import Card from 'components/card'

import { setModalState } from 'store/modules/util'
import { setSelectedCard } from 'store/modules/art'

export default function DealRegisterModal(props: any) {
	const dispatch = useDispatch()

	const cardList = useSelector((state: any) => state.cardList)

	const onSelect = (card) => {
		dispatch(setSelectedCard(card))
		dispatch(setModalState(''))
		console.log('야호! 내가 선택됐다')
	}

	return (
		<div css={registerModalCSS}>
			<div className="openModal modal">
				<section>
					<header>판매할 카드 선택</header>
					<main>
						<div>
							{cardList.length ? (
								cardList.map((card) => (
									<div onClick={() => onSelect(card)} key={card.cardId}>
										<Card card={card} type={0} />
									</div>
								))
							) : (
								<p>소유중인 카드가 없습니다</p>
							)}
						</div>
					</main>
					<footer>
						<button onClick={() => dispatch(setModalState(''))}>취소</button>
					</footer>
				</section>
			</div>
		</div>
	)
}
const registerModalCSS = css`
	.modal {
		display: none;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 99;
		background-color: rgba(0, 0, 0, 0.6);
	}
	section {
		width: 90%;
		max-width: 450px;
		margin: 0 auto;
		border-radius: 25px;
		background-color: #fff;
		/* 팝업이 열릴때 스르륵 열리는 효과 */
		animation: modal-show 0.3s;
		overflow: hidden;
	}
	header {
		position: relative;
		padding: 25px 16px 16px 16px;
		display: flex;
		justify-content: center;
		font-family: 'GongGothicMedium';
		font-size: 25px;
	}
	main {
		padding: 16px;
		font-family: 'GmarketSansMedium';
	}
	footer {
		padding: 12px 16px;
		text-align: right;
		display: flex;
		justify-content: center;
	}
	button {
		outline: none;
		cursor: pointer;
		border: 0;
		padding: 6px 12px;
		margin: 0px 10px 5px 10px;
		color: #1b5198;
		background-color: #d1e4ff;
		border-radius: 12px;
		font-size: 13px;
		width: 8em;
		font-family: 'GongGothicMedium';
	}
	.openModal {
		display: flex;
		align-items: center;
		/* 팝업이 열릴때 스르륵 열리는 효과 */
		animation: modal-bg-show 0.3s;
	}
	@keyframes modal-show {
		from {
			opacity: 0;
			margin-top: -50px;
		}
		to {
			opacity: 1;
			margin-top: 0;
		}
	}
	@keyframes modal-bg-show {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`
