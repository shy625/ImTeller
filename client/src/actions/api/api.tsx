import axios from 'axios'

const HOST = 'http://j7a509.p.ssafy.io:8080/api/v1/'

// axios.defaults.withCredentials = true
const api = axios.create({
  baseURL: HOST,
})

api.interceptors.request.use(
  (config) => {
    const email = localStorage.getItem('email')
    if (!email) return config

    config.headers.Authorization = `${email}` // email? authorization?
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api
