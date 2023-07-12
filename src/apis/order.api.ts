import { AxiosResponse } from 'axios'
import { OrderBody } from '~/types/order.type'
import http from '~/utils/http'

export const createOrder = (body: Omit<OrderBody, 'users_permissions_user'>, userId: number) =>
  http.post<AxiosResponse<any, any>>(
    `/api/bb-orders`,
    {
      data: {
        ...body,
        users_permissions_user: userId
      }
    },
    {
      params: {
        populate: 'deep, 4'
      }
    }
  )
