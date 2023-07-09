import { AxiosResponse } from 'axios'
import { Product } from '~/types/product.type'
import http from '~/utils/http'

export const getProducts = (params?: any) =>
  http.get<AxiosResponse<Product[], Product[]>>('/api/bb-products', {
    params
  })
export const getProductDetail = (id: string) =>
  http.get<AxiosResponse<Product, Product>>(`/api/bb-products/${id}`, {
    params: {
      populate: 'deep, 4'
    }
  })

export const updateProduct = (id: number, quantity: number) =>
  http.put<AxiosResponse<any, any>>(`/api/bb-products/${id}?populate=?`, {
    data: {
      inventory: quantity
    }
  })
