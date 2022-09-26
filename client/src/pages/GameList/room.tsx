import React from 'react'

const Room = (props: any) => {
  return (
    <div>
      <div>{props.num}</div>
      <div>방이름 : {props.name}</div>
      <div>
        {props.people} / {props.max}
      </div>
      <div>
        {props.method} | {props.typeNum}
      </div>
      <div>{props.pw ? '공개' : '비공개'}</div>
    </div>
  )
}
export default Room
