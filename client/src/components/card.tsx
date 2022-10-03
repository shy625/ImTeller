/** @jsxImportSource @emotion/react */

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'

import { setSelectedCards } from 'store/modules/game'
import itemDetail from 'actions/functions/itemDetail'

export default function Card(props: any) {
	const {
		cardId,
		cardTitle,
		cardImageURL,
		description,
		grade,
		effect,
		effectNum,
		createdDt,
		recentPrice,
	} = props.card
	const type = props.type
	const dispatch = useDispatch()

	const selectedCards = useSelector((state: any) => state.selectedCards)
	const [selected, setSelected] = useState(false)
	const [effectPre, effectPost, effectName] = itemDetail(effect, effectNum)

	useEffect(() => {
		if (selectedCards.includes(cardId)) {
			setSelected(true)
		} else {
			setSelected(false)
		}
	}, [selectedCards])

	// 기본적으로 호버시 카드 능력 나오게
	// type 0: 선택 불가능하게
	// type 1: 카드 선택 모달에서 사용. 선택카드의 경우(selectedCards에 포함) 표시

	const select = () => {
		if (type === 1) {
			dispatch(setSelectedCards(cardId))
		}
	}

	return (
		<div>
			<div css={type === 1 && selected ? type1CSS : type0CSS} onClick={select}>
				<img style={{ height: '15vh' }} src={cardImageURL} alt="" />
				<div css={!selected ? type0InfoCSS : displayNoneCSS}>
					<div>{grade}</div>
					<div>{effectName}</div>
					<div>{`${effectNum} ${effectPost}`}</div>
				</div>
			</div>
			<div css={type === 1 && selected ? type1InfoCSS : displayNoneCSS}>✔</div>
			{type === 0 ? (
				<div>
					{cardTitle}
					{description}
					{createdDt}
					{recentPrice}
				</div>
			) : null}
		</div>
	)
}

const type0CSS = css`
	height: 15vh;
	&:hover {
		> div {
			display: block;
		}
		> img {
			filter: brightness(0.5);
		}
	}
`
const type0InfoCSS = css`
	display: none;
	position: relative;
	top: -15vh; // 형제인 paintImgCSS 높이만큼 올려주면 됨
	width: 100%;
	height: 100%;
`
const type1CSS = css`
	filter: brightness(0.5);
`
const type1InfoCSS = css`
	position: relative;
	top: -9vh;
	left: 4.5vh;
`
const displayNoneCSS = css`
	display: none;
`
