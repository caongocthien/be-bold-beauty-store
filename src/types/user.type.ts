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
  role: {
    id: number
    name: string
    description: string
    type: string
    createdAt: string
    updatedAt: string
  }
}
