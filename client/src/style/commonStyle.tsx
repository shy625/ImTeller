import { css } from '@emotion/react'

const normalBtn = css({
  outline: 'none',
  cursor: 'pointer',
  border: 0,
  padding: '6px 12px',
  margin: '0px 10px 5px 10px',
  color: '#1b5198',
  backgroundColor: '#d1e4ff',
  borderRadius: 12,
  fontSize: 13,
  width: '8em',
})
const input = css({
  padding: '10px 10px',
  margin: 10,
  boxSizing: 'border-box',
  border: 'none',
  borderRadius: '12px',
  width: '95%',
  fontFamily: 'normalFont',
})
const textarea = css({
  padding: '10px 10px',
  margin: 10,
  boxSizing: 'border-box',
  border: 'none',
  borderRadius: '12px',
  width: '95%',
  fontFamily: 'normalFont',
})
const imgIcon = css({
  width: 20,
  height: 20,
})
const normalFont = css`
  @font-face {
    font-family: 'GongGothicMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/GongGothicMedium.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }
`
export { normalBtn, input, textarea, imgIcon }
