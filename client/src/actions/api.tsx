import axios from 'axios'

const HOST = 'http://j7a509.p.ssafy.io/api/v1/'

// axios.defaults.withCredentials = true
const api = axios.create({
  baseURL: HOST,
})

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token")
//     if (!token) return config

//     config.headers.Authorization = `${token}`
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

export default api
