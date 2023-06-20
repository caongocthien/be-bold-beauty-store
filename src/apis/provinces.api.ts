import axios from 'axios'

const http = axios.create({
  baseURL: 'https://provinces.open-api.vn/',
  headers: { 'Content-Type': 'application/json' }
})

export const getProvinces = () => http.get('/api/?depth=3')
