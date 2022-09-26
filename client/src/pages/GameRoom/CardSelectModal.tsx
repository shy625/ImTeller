/** @jsxImportSource @emotion/react */
import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { css } from '@emotion/react'

import art from 'actions/api/art'

import check from '../../assets/image/check.png'

// 더미용으로 가져온 이미지 - 삭제할 예정
import card1 from '../../assets/image/4.png'
import card2 from '../../assets/image/11.png'
import card3 from '../../assets/image/55.png'
import card4 from '../../assets/image/61.png'
import card5 from '../../assets/image/65.png'
import card6 from '../../assets/image/73.png'
import card7 from '../../assets/image/1.png'
import card8 from '../../assets/image/22.png'
import card9 from '../../assets/image/31.png'
import card10 from '../../assets/image/36.png'
import card11 from '../../assets/image/69.png'
import card12 from '../../assets/image/64.png'

const CardSelect = (props: any) => {
  // 모달용
  const open: boolean = props.open

  // 카드 선택을 위한 state
  const [selected, setSelected] = useState([])

  // 카드 정보 불러오기
  const email = useSelector((state: any) => state.email)
  const [cardList, setCardList] = useState([])
  useEffect(() => {
    art.cardList(email).then((result) => {
      setCardList(result.data.cardList)
    })
  }, [email])

  // 카드 carousel
  let limit = 6
  const numPages = Math.ceil(cardDummy.length / limit) || 1
  const [page, setPage] = useState(0)

  // 카드 선택하기
  const selectCard = (cardId) => {
    // 이미 3개를 선택했으면 취소만 가능
    if (selected.length >= 3) {
      // 이미 선택했던 것을 또 넣으면 취소
      for (let i = 0; i < selected.length; i++) {
        if (selected[i] == cardId) {
          setSelected(selected.filter((c) => c !== cardId))
          alert(`${cardId} 선택이 취소되었습니다`)
          return
        }
      }
      alert('최대 3개의 카드 선택이 가능합니다.')
    } else {
      // 이미 선택했던 것을 또 넣으면 취소
      for (let i = 0; i < selected.length; i++) {
        if (selected[i] == cardId) {
          setSelected(selected.filter((c) => c !== cardId))
          alert(`${cardId} 선택이 취소되었습니다`)
          return
        }
      }
      // 똑같은 걸 못찾았으면 그냥 더하기
      setSelected([...selected, cardId])
    }
  }
  const moveLeft = () => {
    let num: number = Math.floor(page / limit)
    if (num === 0) {
      setPage((numPages - 1) * 6)
    } else {
      setPage((num - 1) * 6)
    }
  }
  const moveRight = () => {
    let num: number = Math.floor(page / limit)
    if (num === numPages - 1) {
      setPage(0)
    } else {
      setPage((num + 1) * 6)
    }
  }
  return (
    <div css={makeRoomModal}>
      <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <section>
            <header>카드 선택하기</header>
            <main>
              <div className="window">
                <button onClick={moveLeft}>왼쪽으로</button>
                <div className="container" css={cards}>
                  {cardDummy.slice(page, page + limit).map((card, i) => (
                    <div key={i} css={cardOne} onClick={() => selectCard(card.cardId)}>
                      <div className="info" css={info}>
                        <div>{card.grade}</div>
                        <div>{card.effect}</div>
                        <div>{card.effectDetail}</div>
                      </div>
                      <img
                        src={check}
                        alt="check"
                        className="check"
                        css={selected.includes(card.cardId) ? cardOneSelected : checkImg}
                      />
                      <img src={card.cardImageURL} alt="카드" css={cardSize} />
                    </div>
                  ))}
                </div>
                <button onClick={moveRight}>오른쪽으로</button>
                <div className="nav">
                  {Array(numPages)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} onClick={() => setPage(i * 6)}>
                        ●
                      </div>
                    ))}
                </div>
              </div>
              {/* <div className="window" css={window}>
                <button>왼쪽으로</button>
                <div className="container" css={container}>
                  {Array(numPages)
                    .fill(0)
                    .map((_, p) => (
                      <div css={cards} key={p}>
                        {cardDummy.slice(p * 6, p * 6 + limit).map((card, i) => (
                          <div key={i} css={cardOne} onClick={() => selectCard(card.cardId)}>
                            <div className="info" css={info}>
                              <div>{card.grade}</div>
                              <div>{card.effect}</div>
                              <div>{card.effectDetail}</div>
                            </div>
                            <img
                              src={check}
                              alt="check"
                              className="check"
                              css={selected.includes(card.cardId) ? cardOneSelected : checkImg}
                            />
                            <img src={card.cardImageURL} alt="카드" css={cardSize} />
                          </div>
                        ))}
                      </div>
                    ))}
                </div>
                <button>왼쪽으로</button>
                <div className="nav">
                  {Array(numPages)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} onClick={() => setPage(i * 6)}>
                        ●
                      </div>
                    ))}
                </div>
              </div> */}
            </main>
            <footer>
              <button className="submit">선택</button>
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
  section {
    width: 90%;
    max-width: 500px;
    margin: 0 auto;
    border-radius: 12px;
    background-color: #fff;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-show 0.3s;
    overflow: hidden;
  }
  header {
    position: relative;
    padding: 16px 16px 0px 16px;
    font-weight: 700;
    display: flex;
    justify-content: center;
  }
  main {
    padding: 16px;
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
const cards = css({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  overflow: 'hidden',
})
const cardSize = css({
  margin: '10px',
  width: '100%',
})
const cardOne = css({
  flexShrink: 1,
  flexBasis: '30%',
  width: '8em',
  maxHeight: '15em',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  '&:hover .info, .overlay': {
    visibility: 'visible',
  },
})
const info = css({
  position: 'absolute',
  visibility: 'hidden',
  width: '100%',
  height: '90%',
  color: '#F4FFFF',
  background: 'rgba(0, 0, 0, 0.6)',
  borderRadius: '12px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  '.info div': {
    textAlign: 'center',
  },
  zIndex: 100,
})
const cardOneSelected = css({
  position: 'absolute',
  width: '3em',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})
const checkImg = css({
  display: 'none',
})
const container = css({
  display: 'flex',
})
const window = css({
  overflow: 'hidden',
  position: 'relative',
  width: '500px',
})
const cardDummy = [
  {
    cardId: 1,
    cardTitle: '그림제목',
    cardImageURL: card1,
    description: '그림설명',
    grade: '등급',
    effect: '콰콰과광! 점수 다 쓸어가기',
    effectDetail: '세부값',
    createdDT: 'NFT카드가 된 시간',
    recentPrice: '최근 판매가',
  },
  {
    cardId: 2,
    cardTitle: '그림제목',
    cardImageURL: card2,
    description: '그림설명',
    grade: '등급',
    effect: '효과',
    effectDetail: '세부값',
    createdDT: 'NFT카드가 된 시간',
    recentPrice: '최근 판매가',
  },
  {
    cardId: 3,
    cardTitle: '그림제목',
    cardImageURL: card3,
    description: '그림설명',
    grade: '등급',
    effect: '효과',
    effectDetail: '세부값',
    createdDT: 'NFT카드가 된 시간',
    recentPrice: '최근 판매가',
  },
  {
    cardId: 4,
    cardTitle: '그림제목',
    cardImageURL: card4,
    description: '그림설명',
    grade: '등급',
    effect: '효과',
    effectDetail: '세부값',
    createdDT: 'NFT카드가 된 시간',
    recentPrice: '최근 판매가',
  },
  {
    cardId: 5,
    cardTitle: '그림제목',
    cardImageURL: card5,
    description: '그림설명',
    grade: '등급',
    effect: '효과',
    effectDetail: '세부값',
    createdDT: 'NFT카드가 된 시간',
    recentPrice: '최근 판매가',
  },
  {
    cardId: 6,
    cardTitle: '그림제목',
    cardImageURL: card6,
    description: '그림설명',
    grade: '등급',
    effect: '효과',
    effectDetail: '세부값',
    createdDT: 'NFT카드가 된 시간',
    recentPrice: '최근 판매가',
  },
  {
    cardId: 7,
    cardTitle: '그림제목',
    cardImageURL: card7,
    description: '그림설명',
    grade: '등급',
    effect: '콰콰과광! 점수 다 쓸어가기',
    effectDetail: '세부값',
    createdDT: 'NFT카드가 된 시간',
    recentPrice: '최근 판매가',
  },
  {
    cardId: 8,
    cardTitle: '그림제목',
    cardImageURL: card8,
    description: '그림설명',
    grade: '등급',
    effect: '효과',
    effectDetail: '세부값',
    createdDT: 'NFT카드가 된 시간',
    recentPrice: '최근 판매가',
  },
  {
    cardId: 9,
    cardTitle: '그림제목',
    cardImageURL: card9,
    description: '그림설명',
    grade: '등급',
    effect: '효과',
    effectDetail: '세부값',
    createdDT: 'NFT카드가 된 시간',
    recentPrice: '최근 판매가',
  },
  {
    cardId: 10,
    cardTitle: '그림제목',
    cardImageURL: card10,
    description: '그림설명',
    grade: '등급',
    effect: '효과',
    effectDetail: '세부값',
    createdDT: 'NFT카드가 된 시간',
    recentPrice: '최근 판매가',
  },
  {
    cardId: 11,
    cardTitle: '그림제목',
    cardImageURL: card11,
    description: '그림설명',
    grade: '등급',
    effect: '효과',
    effectDetail: '세부값',
    createdDT: 'NFT카드가 된 시간',
    recentPrice: '최근 판매가',
  },
  {
    cardId: 12,
    cardTitle: '그림제목',
    cardImageURL: card12,
    description: '그림설명',
    grade: '등급',
    effect: '효과',
    effectDetail: '세부값',
    createdDT: 'NFT카드가 된 시간',
    recentPrice: '최근 판매가',
  },
]
export default CardSelect
