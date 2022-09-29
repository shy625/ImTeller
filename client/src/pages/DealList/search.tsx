import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import deal from 'actions/api/deal'
import { setDealList } from 'store/modules/art'

export default function Search() {
  const [query, setQuery] = useState('')
  const [target, setTarget] = useState(0) // 검색 조건. 0작품명, 1제작자, 2소유자
  const [sort, setSort] = useState(0) // 정렬 조건. 0기본순, 1최신순
  const [status, setStatus] = useState(0) // 정렬조건2. 0전체, 1진행중, 2완료

  useEffect(() => {
    onSubmit()
  }, [])

  const inputFilter = (event) => {
    let query = event.target.value
    query = query.replace(/[^a-z|A-Z|0-9|ㄱ-ㅎ|가-힣]/g, '')
    if (query.length > 20) {
      query = query.slice(0, 20)
    }
    event.target.value = query
    setQuery(event.target.value)
  }

  const onSubmit = () => {
    const params = {
      query,
      target,
      sort,
      status,
    }
    deal.dealList(params).then((result) => {
      console.log(result)
      setDealList(result.data)
    })
  }

  return (
    <div>
      <select name="target" onChange={(e: any) => setTarget(e.target.value)}>
        <option value={0}>작품명</option>
        <option value={1}>제작자</option>
        <option value={2}>판매자</option>
      </select>
      <input type="text" onChange={(e) => inputFilter(e)} />
      <button onClick={onSubmit}>검색</button>
      <br />
      <select name="sort" onChange={(e: any) => setSort(e.target.value)}>
        <option value={0}>최신순</option>
        <option value={1}>높은가격순</option>
        <option value={2}>낮은가격순</option>
      </select>
      <select name="status" onChange={(e: any) => setStatus(e.target.value)}>
        <option value={0}>전체</option>
        <option value={1}>경매진행중</option>
        <option value={2}>경매완료</option>
      </select>
    </div>
  )
}
