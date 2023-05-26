import { AxiosResponse } from 'axios'
import { Cart } from '~/types/cart.type'
import http from '~/utils/http'
export type BodyUpdate = {
  quantity: number
  bb_product: number
}

export const getCarts = (userId: string) =>
  http.get<AxiosResponse<Cart[], Cart[]>>('/api/bb-carts', {
    params: {
      populate: 'deep, 4',
      'filters[users_permissions_user][id][$eq]': userId
    }
  })

export const createCart = (userId: string, cartItems: BodyUpdate[]) =>
  http.post<AxiosResponse<Cart, Cart>>(`/api/bb-carts`, {
    data: {
      users_permissions_user: userId,
      cart_item: cartItems
    }
  })

export const updateCart = (cartId: string, cartItems: BodyUpdate[]) =>
  http.put(`/api/bb-carts/${cartId}`, {
    data: {
      cart_item: cartItems
    }
  })

export const deleteCart = (cartId: string) => http.delete(`/api/bb-carts/${cartId}`)
