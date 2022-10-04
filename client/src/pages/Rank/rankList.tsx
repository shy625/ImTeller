/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useState } from 'react'

export default function rankList(props: any) {
	const { tabNo } = props

	return (
		<div css={box}>
			<div css={title}>랭킹 탭이름 props 받아서 넣어야될 것 같은디</div>
			<div css={list}>왜 배경이 꽉안차는걸까 css는 어렵다</div>
		</div>
	)
}
const box = css`
	display: flex;
	flex-direction: column;
`

const title = css`
	font-size: 25px;
	color: white;
	margin: 20px;
`
const list = css`
	width: auto;
	background-color: rgb(239, 238, 245, 0.3);
	border-radius: 5px;
	//box-shadow: 5px 5px 20px;
`
