/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'

import Loading from 'components/loading'

import art from 'actions/api/art'
import { setLoading } from 'store/modules/util'
import { useModal } from 'actions/hooks/useModal'
import { setPaintList, setSelectedPaint } from 'store/modules/art'
import { createCard } from 'contract/API'
import connectMetaMask from 'actions/functions/connectMetaMask'

export default function Paint(props: any) {
	const { paintId, paintTitle, paintImageURL, description, isVote } = props.paint
	const type = props.type
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const selectedPaint = useSelector((state: any) => state.selectedPaint)
	const loading = useSelector((state: any) => state.loading)
	const [selected, setSelected] = useState(false)
	const currentUser = useSelector((state: any) => state.currentUser)
	const [connectedWallet, setConnectedWallet] = useState('')
	const [setModalState, setModalMsg, setModalResult] = useModal('')

	useEffect(() => {
		if (selectedPaint === paintId) {
			setSelected(true)
		} else {
			setSelected(false)
		}
	}, [selectedPaint])

	// type 0: 마이페이지인 경우 호버시 수정 및 출품하기
	// type 1: 출품 모달에서 사용

	const select = () => {
		dispatch(setSelectedPaint(paintId))
	}

	const onDelete = () => {
		const result = confirm('정말 삭제하시겠습니까?')
		if (!result) return
		art.paintDelete(paintId).then((result) => {
			art.paintList({ nickname: currentUser.nickname }).then((result) => {
				console.log(result)
				dispatch(setPaintList(result.data))
			})
		})
	}

	const onMint = async () => {
		const check: any = await connectMetaMask()
		if (!check) {
			alert('지갑을 연결하세요')
			return
		}
		if (check !== currentUser.wallet) {
			setModalMsg('등록된 지갑주소와 동일한 메타마스크 지갑주소를 연결해야 합니다')
			setModalState('alert')
			return
		}

		const tokenId = await createCard(currentUser.wallet, paintImageURL).catch((error) => {
			setModalMsg('민팅에 실패했습니다.')
			setModalState('alert')
			dispatch(setLoading(false))
			return
		})

		art
			.createNft({ artId: paintId, tokenId })
			.then((result) => {
				console.log(result)
				setModalMsg('민팅에 성공했습니다.')
				setModalState('alert')
			})
			.catch((error) => {
				console.error(error)
			})
	}

	return (
		<div>
			<div css={type === 0 ? type0CSS : type === 1 && selected ? type1CSS : null} onClick={select}>
				<img style={{ height: '15vh' }} src={paintImageURL} alt="" />
				<div css={!isVote && type === 0 ? type0InfoCSS : { display: 'none' }}>
					<div
						onClick={() => {
							navigate('/paint', { state: { isEdit: true, paint: props.paint } })
						}}
					>
						수정하기
					</div>
					<div
						onClick={() => {
							setModalState('voteRegister')
						}}
					>
						출품하기
					</div>
					<div key={paintId} onClick={onMint}>
						민팅하기
					</div>
					<div onClick={onDelete}>삭제하기</div>
				</div>
				<div css={type === 1 && selected ? type1InfoCSS : { display: 'none' }}>✔</div>
			</div>
			{paintTitle}
			{description}
			{loading ? <Loading msg="거래가 진행중입니다. 잠시만 기다려주세요" /> : null}
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
	top: -15vh; // 부모인 paintImgCSS 높이만큼 올려주면 됨
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
