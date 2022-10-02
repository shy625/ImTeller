import { css } from '@emotion/react'

// 와이어프레임에 나온 기본 버튼
const normalBtn = css`
	outline: 'none';
	cursor: url('https://imtellercard.s3.ap-northeast-2.amazonaws.com/brushClick.png'), auto;
	border: 0;
	padding: '6px 12px';
	margin: '0px 10px 5px 10px';
	color: '#1b5198';
	backgroundcolor: '#d1e4ff';
	borderradius: 12;
	fontsize: 13;
	width: '8em';
	fontfamily: 'GongGothicMedium';
`
// text만 적혀있는 버튼
const textBtn = css`
	cursor: url('https://imtellercard.s3.ap-northeast-2.amazonaws.com/brushClick.png'), auto;
`
const input = css({
	padding: '10px 10px',
	margin: 10,
	boxSizing: 'border-box',
	border: 'none',
	borderRadius: '12px',
	width: '95%',
	fontFamily: 'GongGothicMedium',
})
const textarea = css({
	padding: '10px 10px',
	margin: 10,
	boxSizing: 'border-box',
	border: 'none',
	borderRadius: '12px',
	width: '95%',
	fontFamily: 'GongGothicMedium',
})
// 아이콘용 이미지 크기 조절
const imgIcon = css({
	width: 20,
	height: 20,
})
// 페이지 풀 사이즈로 키우기
const fullDisplay = css({
	height: 'auto',
	minHeight: '100vh',
})

export { normalBtn, textBtn, input, textarea, imgIcon, fullDisplay }
