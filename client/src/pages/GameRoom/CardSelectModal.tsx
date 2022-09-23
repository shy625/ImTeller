/** @jsxImportSource @emotion/react */
import React from 'react'
import { useState } from 'react'
import { css } from '@emotion/react'

const CardSelect = (props: any) => {
  // 모달용
  const open: boolean = props.open

  // 카드 선택을 위한 state

  // const onSubmit = () => {

  // }

  return (
    <div css={makeRoomModal}>
      <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <section>
            <header>카드 선택하기</header>
            <main>
              <form>
                {/* <select onChange={(e) => setCondition(e.target.value)}> */}
                <select>
                  <option value={0} disabled>
                    승리 조건
                  </option>
                  <option value={2}>2라운드</option>
                  <option value={3}>3라운드</option>
                  <option value={4}>4라운드</option>
                  <option value={5}>5라운드</option>
                </select>
              </form>
            </main>
            <footer>
              <button className="submit">생성하기</button>
              <button className="close" onClick={props.close}>
                취소
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    </div>
  )
}
// style 관련
const makeRoomModal = css`
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
  .modal button {
    outline: none;
    cursor: pointer;
    border: 0;
  }
  .modal > section {
    width: 90%;
    max-width: 450px;
    margin: 0 auto;
    border-radius: 0.3rem;
    background-color: #fff;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-show 0.3s;
    overflow: hidden;
  }
  .modal > section > header {
    position: relative;
    padding: 16px 64px 16px 16px;
    font-weight: 700;
  }
  .modal > section > header button {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    font-size: 21px;
    font-weight: 700;
    text-align: center;
    color: #999;
    background-color: transparent;
  }
  .modal > section > main {
    padding: 16px;
  }
  .modal > section > footer {
    padding: 12px 16px;
    text-align: right;
  }
  .modal > section > footer button {
    padding: 6px 12px;
    color: #fff;
    background-color: #6c757d;
    border-radius: 5px;
    font-size: 13px;
  }
  .modal.openModal {
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
export default CardSelect
