export interface User {
  id: number
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
  phone: string
  address: string
  // role: {
  //   id: number
  //   name: string
  //   description: string
  //   type: string
  //   createdAt: string
  //   updatedAt: string
  // }
}

const a = {
  id: 22,
  username: 'admin1',
  email: 'admin1@gmail.com',
  provider: 'local',
  confirmed: true,
  blocked: false,
  createdAt: '2023-05-28T20:04:21.066Z',
  updatedAt: '2023-05-28T20:04:21.066Z',
  phone: '0378965345',
  address: null
}
