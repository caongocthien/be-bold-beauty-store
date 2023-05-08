import { AxiosResponse } from 'axios'
import { Product, ProductListConfig } from '~/types/product.type'
import http from '~/utils/http'

export const getProducts = (params?: any) =>
  http.get<AxiosResponse<Product[], Product[]>>('/api/bb-products', {
    params
  })
export const getProductDetail = (id: string) =>
  http.get<AxiosResponse<Product, Product>>(`/api/bb-products/${id}`, {
    params: {
      populate: '*'
    }
  })
