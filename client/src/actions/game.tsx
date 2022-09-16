import api from './api'

const END_POINT = 'game'

const game = {
  roomList() {
    return api({
      method: 'get',
      url: `${END_POINT}/rooms`,
    })
  },
  roomDetail(roomId) {
    return api({
      method: 'get',
      url: `${END_POINT}/rooms/${roomId}`,
    })
  },
  join(roomId) {
    return api({
      method: 'get',
      url: `${END_POINT}/rooms/${roomId}/join`,
    })
  },
  make() {
    return api({
      method: 'post',
      url: `${END_POINT}/make`,
    })
  },
}

export default game
