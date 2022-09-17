import api from './api'

const END_POINT = 'deal'

const deal = {
  register() {
    return api({
      method: 'post',
      url: `${END_POINT}/register`,
    })
  },
  cardList() {
    return api({
      method: 'get',
      url: `${END_POINT}/cards`,
    })
  },
  cardDetail(cardId) {
    return api({
      method: 'get',
      url: `${END_POINT}/${cardId}`,
    })
  },
  bid(cardId) {
    return api({
      method: 'post',
      url: `${END_POINT}/${cardId}/bid`,
    })
  },
  cancelBid(cardId) {
    return api({
      method: 'post',
      url: `${END_POINT}/${cardId}/cancel`,
    })
  },
}

export default deal
