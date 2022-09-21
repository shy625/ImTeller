import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Layout from 'layout/layout'
import user from 'actions/api/user'

export default function ProfileEdit(props: any) {
  const navigate = useNavigate()

  const [nickValid, setNickValid] = useState('')
  const [nickChecked, setNickChecked] = useState(false)
  const currentUser = useSelector((state: any) => state.currentUser)
  const email = useSelector((state: any) => state.email)

  const changeImage = (event) => {
    const image = event.target.files[0]

    const imageTag: any = document.querySelector('#image')
    imageTag.src = URL.createObjectURL(image)
  }

  const resetImage = () => {
    const imageInput: any = document.querySelector('#profileImage')
    imageInput.value = ''

    const imageTag: any = document.querySelector('#image')
    imageTag.src = currentUser.profile
  }

  const deleteImage = () => {
    const imageInput: any = document.querySelector('#profileImage')
    imageInput.value = ''

    const imageTag: any = document.querySelector('#image')
    imageTag.src = ''
  }

  const nickFilter = (event) => {
    setNickChecked(false)

    let nickname = event.target.value
    nickname = nickname.replace(/[^a-z|A-Z|0-9|ㄱ-ㅎ|가-힣]/g, '')
    if (nickname.length < 5) {
      setNickValid('5자 이상의 닉네임을 지어주세요')
    } else if (nickname.length > 20) {
      nickname = nickname.slice(0, 20)
    } else {
      setNickValid('')
    }
    event.target.value = nickname
  }

  const checkNick = () => {
    if (nickValid) return alert('닉네임 규칙지키세요')
    const nickname: any = document.querySelector('#nickname')
    if (!nickname.value) return alert('닉네임 입력하셈')

    const data = { nickname: nickname.value }
    user
      .checkNickname(data)
      .then((result) => {
        console.log(result)
        if (result.data == '사용가능한 닉네임입니다.') {
          setNickChecked(true)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (!nickChecked) return alert('닉네임 중복체크하셈')

    const formdata: any = new FormData()
    formdata.append('email', email)
    const nickname: any = document.querySelector('#nickname')
    formdata.append('nickname', nickname.value)

    const ImageTag: any = document.querySelector('#image')
    if (currentUser.profile !== ImageTag.src) {
      const profileImage: any = document.querySelector('#profileImage')
      formdata.append('profile', profileImage.files[0])
    }
    user.profileEdit(formdata) // 결과 오면 처리하기
  }

  return (
    <Layout>
      <main>
        여긴 ProfileEdit
        <img id="image" src={currentUser.profile} alt="" />
        <div>
          <label htmlFor="profileImage">프로필 이미지</label>
          <input
            id="profileImage"
            type="file"
            accept="image/*"
            onChange={(event) => {
              changeImage(event)
            }}
          />
          <button onClick={resetImage}>원상복구하기</button>
          <button onClick={deleteImage}>지우기</button>
        </div>
        <div>
          <label htmlFor="nickname">닉네임</label>
          <input
            id="nickname"
            type="text"
            defaultValue={currentUser.nickname || ''}
            placeholder="닉네임"
            required
            onChange={(event) => {
              nickFilter(event)
            }}
          />
          <button onClick={checkNick}>닉네임 중복 체크</button>
          {nickChecked ? '✅' : null}
          {nickValid}
        </div>
        <button
          onClick={(event) => {
            onSubmit(event)
          }}
        >
          수정하기
        </button>
        <button
          onClick={() => {
            navigate(-1)
          }}
        >
          뒤로
        </button>
        <button
          onClick={() => {
            alert('없음')
          }}
        >
          회원 탈퇴
        </button>
        <div>회원정보에 지갑주소 없으면 지갑주소 변경 할 수 있도록 하기</div>
      </main>
    </Layout>
  )
}
