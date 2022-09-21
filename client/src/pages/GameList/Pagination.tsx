/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'

function Pagination({ total, limit, page, setPage }: any) {
  const numPages = Math.ceil(total / limit) || 1

  return (
    <>
      <div css={Nav}>
        <button css={Button} onClick={() => setPage(page - 1)} disabled={page === 0}>
          &lt;
        </button>
        {Array(numPages)
          .fill(0)
          .map((_, i) => (
            <div
              css={Button}
              key={i + 1}
              onClick={() => setPage(i)}
              aria-current={page === i ? 'page' : null}
            >
              {i + 1}
            </div>
          ))}
        <button css={Button} onClick={() => setPage(page + 1)} disabled={page === numPages - 1}>
          &gt;
        </button>
      </div>
    </>
  )
}

const Nav = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`

const Button = css`
  border: none;
  border-radius: 50px;
  height: 2em;
  width: 2em;
  margin: 0;
  background: none;
  color: black;
  font-size: 1rem;
  font-family: 'Pretendard-Regular';

  &:hover {
    background: #fff7e7;
    cursor: pointer;
  }

  &[disabled] {
    background: transparent;
    cursor: revert;
    transform: revert;
    color: #c8c8c8;
  }

  &[aria-current] {
    background: #ffd89e;
    cursor: revert;
    transform: revert;
  }
`

export default Pagination
