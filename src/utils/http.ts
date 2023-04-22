import axios from 'axios'

const http = axios.create({
  baseURL: 'https://strapi-backend-f82j.onrender.com/',
  headers: { 'Content-Type': 'application/json' }
})

export default http
