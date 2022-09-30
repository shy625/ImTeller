import api from './api'

const END_POINT = 'art'

const art = {
  cardList(data) {
    return api({
      method: 'post',
      url: `${END_POINT}/cards`,
      data: data,
    })
  },
  paintList(data) {
    return api({
      method: 'post',
      url: `${END_POINT}/paints`,
      data: data,
    })
  },
  paintCreate(data) {
    return api({
      method: 'post',
      url: `${END_POINT}/paints/save`,
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  paintUpdate(data) {
    return api({
      method: 'petch',
      url: `${END_POINT}/paints/edit`,
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  paintDelete() {
    return api({
      method: 'delete',
      url: `${END_POINT}/paints`,
    })
  },
}

export default art
