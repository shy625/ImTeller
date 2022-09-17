import api from './api'

const END_POINT = 'art'

const art = {
  cardList() {
    return api({
      method: 'get',
      url: `${END_POINT}/cards`,
    })
  },
  paintList() {
    return api({
      method: 'get',
      url: `${END_POINT}/paints`,
    })
  },
  paintCreate() {
    return api({
      method: 'post',
      url: `${END_POINT}/paints`,
    })
  },
  paintUpdate() {
    return api({
      method: 'petch',
      url: `${END_POINT}/paints`,
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
