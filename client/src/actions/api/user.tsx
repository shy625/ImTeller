import api from './api'

const END_POINT = 'user'

const user = {
  login(data) {
    return api({
      method: 'post',
      url: `${END_POINT}/login`,
      data: data,
    })
  },
  signup(data) {
    return api({
      method: 'post',
      url: `${END_POINT}/signup`,
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  profileEdit(data) {
    return api({
      method: 'patch',
      url: `${END_POINT}/edit`,
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}

export default user
