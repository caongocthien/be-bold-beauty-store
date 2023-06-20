import { Auth } from '~/types/auth.type'
import { User } from '~/types/user.type'
import http from '~/utils/http'

const token =
  'f425ac8676defed1c2a6b2d84644ba925a1a3a68b02db0b75f9db68327d22a2118cbffa427eefad9be7e9a69128e5d2ae75d8ca17054ceb09d8ab73ce64d2ddc7ab6da99f0b503256727c22742db2299760915776d11b9dfeda23400a3d6c2612080f59096a42e514b8633df2e30fcce847476ece572117b883e6e7509a7c542'
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

const config = {
  headers: { Authorization: `Bearer ${token}` }
}

export const register = (body: BodyRegister) => http.post<Auth>('/api/auth/local/register', body, config)
export const login = (body: BodyLogin) => http.post<Auth>('/api/auth/local', body, config)
export const validateUser = (userToken: string | null) =>
  http.get('/api/users/me', {
    headers: { Authorization: `Bearer ${userToken}` }
  })

export const updateUser = (body: Pick<User, 'phone' | 'address'>, id: number) =>
  http.put(`/api/users/${id}`, body, config)
