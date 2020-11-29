import axios from 'axios'

const axiosInstanse = axios.create({
  baseURL: 'https://localhost',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default axiosInstanse
