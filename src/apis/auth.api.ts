import { Auth } from '~/types/auth.type'
import http from '~/utils/http'

type BodyRegister = {
  email: string
  username: string
  phone: string
  password: string
}

type BodyLogin = {
  identifier: string
  password: string
}

export const register = (body: BodyRegister) => http.post<Auth>('/api/auth/local/register', body)
export const login = (body: BodyLogin) => http.post<Auth>('/api/auth/local', body)
