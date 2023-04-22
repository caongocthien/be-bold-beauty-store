import { Auth } from '~/types/auth.type'
import http from '~/utils/http'

type Body = {
  email: string
  username: string
  phone: string
  password: string
}
export const registerUser = (body: Body) => http.post<Auth>('/api/auth/local/register', body)
