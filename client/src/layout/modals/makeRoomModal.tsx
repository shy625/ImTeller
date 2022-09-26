import React, { useState } from 'react'
import { css } from '@emotion/react'

export default function MakeRoomModal(props: any) {
  return <div>makeRoomModal</div>
}

// export default function MakeRoomModal(props: any) {
//   // 모달용
//   const open: boolean = props.open

//   // 방 생성을 위한 state
//   const [name, setName] = useState('')
//   const [people, setPeople] = useState('')
//   const [type, setType] = useState('')
//   const [condition, setCondition] = useState('')
//   const [lock, setLock] = useState('')
//   const [pw, setPw] = useState('')

//   const onSubmit = () => {
//     console.log(name)
//     console.log(people)
//     console.log(type)
//     console.log(condition)
//     console.log(name)
//   }

//   return (
//     <div css={makeRoomModal}>
//       <div className={open ? 'openModal modal' : 'modal'}>
//         {open ? (
//           <section>
//             <header>방 만들기</header>
//             <main>
//               <form>
//                 <input onChange={(e) => setName(e.target.value)} placeholder="방 제목"></input>
//                 <select onChange={(e) => setPeople(e.target.value)}>
//                   <option value={0} disabled>
//                     인원
//                   </option>
//                   <option value={3}>3명</option>
//                   <option value={4}>4명</option>
//                   <option value={5}>5명</option>
//                   <option value={6}>6명</option>
//                 </select>
//                 <label>
//                   <input
//                     onChange={(e) => setType(e.target.value)}
//                     type={'radio'}
//                     name="type"
//                     value={'라운드'}
//                   ></input>
//                   라운드
//                 </label>
//                 <label>
//                   <input
//                     onChange={(e) => setType(e.target.value)}
//                     type={'radio'}
//                     name="type"
//                     value={'점수'}
//                   ></input>
//                   점수
//                 </label>
//                 {type === '점수' ? (
//                   <input
//                     onChange={(e) => setCondition(e.target.value)}
//                     placeholder="승리 점수"
//                   ></input>
//                 ) : (
//                   <select onChange={(e) => setCondition(e.target.value)}>
//                     <option value={0} disabled>
//                       승리 조건
//                     </option>
//                     <option value={2}>2라운드</option>
//                     <option value={3}>3라운드</option>
//                     <option value={4}>4라운드</option>
//                     <option value={5}>5라운드</option>
//                   </select>
//                 )}
//                 <label>
//                   <input
//                     onChange={(e) => setLock(e.target.value)}
//                     type={'radio'}
//                     name="lock"
//                     value={'공개'}
//                   ></input>
//                   공개
//                 </label>
//                 <label>
//                   <input
//                     onChange={(e) => setLock(e.target.value)}
//                     type={'radio'}
//                     name="lock"
//                     value={'비공개'}
//                   ></input>
//                   비공개
//                 </label>
//                 {lock === '비공개' ? (
//                   <input onChange={(e) => setPw(e.target.value)} placeholder="비밀번호"></input>
//                 ) : null}
//               </form>
//             </main>
//             <footer>
//               <button className="submit" onClick={onSubmit}>
//                 생성하기
//               </button>
//               <button className="close" onClick={props.close}>
//                 취소
//               </button>
//             </footer>
//           </section>
//         ) : null}
//       </div>
//     </div>
//   )
// }
// // style 관련
// const makeRoomModal = css`
//   .modal {
//     display: none;
//     position: fixed;
//     top: 0;
//     right: 0;
//     bottom: 0;
//     left: 0;
//     z-index: 99;
//     background-color: rgba(0, 0, 0, 0.6);
//   }
//   .modal button {
//     outline: none;
//     cursor: pointer;
//     border: 0;
//   }
//   .modal > section {
//     width: 90%;
//     max-width: 450px;
//     margin: 0 auto;
//     border-radius: 0.3rem;
//     background-color: #fff;
//     /* 팝업이 열릴때 스르륵 열리는 효과 */
//     animation: modal-show 0.3s;
//     overflow: hidden;
//   }
//   .modal > section > header {
//     position: relative;
//     padding: 16px 64px 16px 16px;
//     font-weight: 700;
//   }
//   .modal > section > header button {
//     position: absolute;
//     top: 15px;
//     right: 15px;
//     width: 30px;
//     font-size: 21px;
//     font-weight: 700;
//     text-align: center;
//     color: #999;
//     background-color: transparent;
//   }
//   .modal > section > main {
//     padding: 16px;
//   }
//   .modal > section > footer {
//     padding: 12px 16px;
//     text-align: right;
//   }
//   .modal > section > footer button {
//     padding: 6px 12px;
//     color: #fff;
//     background-color: #6c757d;
//     border-radius: 5px;
//     font-size: 13px;
//   }
//   .modal.openModal {
//     display: flex;
//     align-items: center;
//     /* 팝업이 열릴때 스르륵 열리는 효과 */
//     animation: modal-bg-show 0.3s;
//   }
//   @keyframes modal-show {
//     from {
//       opacity: 0;
//       margin-top: -50px;
//     }
//     to {
//       opacity: 1;
//       margin-top: 0;
//     }
//   }
//   @keyframes modal-bg-show {
//     from {
//       opacity: 0;
//     }
//     to {
//       opacity: 1;
//     }
//   }
// `
