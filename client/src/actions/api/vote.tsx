import api from './api'

const END_POINT = 'vote'

const vote = {
  paintList() {
    return api({
      method: 'get',
      url: `${END_POINT}/paints`,
    })
  },
  paintSubmit() {
    return api({
      method: 'post',
      url: `${END_POINT}/submit`,
    })
  },
  vote() {
    return api({
      method: 'post',
      url: `${END_POINT}/like`,
    })
  },
}

export default vote
