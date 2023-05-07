import { AxiosResponse } from 'axios'
import { Category } from '~/types/category.type'
import http from '~/utils/http'

export const getCategories = () => http.get<AxiosResponse<Category[], any>>('/api/bb-product-categories')
export const getCategory = (id: string) =>
  http.get<AxiosResponse<Category, any>>(`/api/bb-product-categories/${id}`, {
    params: {
      'populate[bb_products][populate][0]': 'productImage'
    }
  })
