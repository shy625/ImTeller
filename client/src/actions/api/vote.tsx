import api from './api'

const END_POINT = 'vote'

const vote = {
	paintList() {
		return api({
			method: 'get',
			url: `${END_POINT}/paints`,
		})
	},
	paintSubmit(data) {
		return api({
			method: 'post',
			url: `${END_POINT}/submit`,
			data: data,
		})
	},
	vote(data) {
		return api({
			method: 'post',
			url: `${END_POINT}/like`,
			data: data,
		})
	},
}

export default vote
