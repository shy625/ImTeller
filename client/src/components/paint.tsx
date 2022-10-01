/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'

import art from 'actions/api/art'
import { setSelectedPaint } from 'store/modules/art'
import { useModal } from 'actions/hooks/useModal'

export default function Paint(props: any) {
  const { paintId, paintTitle, paintImageURL, description, isVote } = props.paint
  const type = props.type
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const selectedPaint = useSelector((state: any) => state.selectedPaint)
  const modalResult = useSelector((state: any) => state.modalResult)
  const [selected, setSelected] = useState(false)
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
    setModalMsg('정말 삭제하시겠습니까?')
    setModalState('confirm')
  }

  useEffect(() => {
    if (modalResult === 1) {
      art.paintDelete(paintId).then((result) => {
        console.log(result)
        // 삭제됐으면 그림 리스트 다시 받아오기
      })
    }
    setModalResult(0)
  }, [modalResult])

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
          <div onClick={onDelete}>삭제하기</div>
        </div>
        <div css={type === 1 && selected ? type1InfoCSS : { display: 'none' }}>✔</div>
      </div>
      {paintTitle}
      {description}
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
  position: absolute;
  top: 6vh;
  left: 4.5vh;
`
