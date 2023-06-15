import { AxiosResponse } from 'axios'
import { Brand } from '~/types/brand.type'
import http from '~/utils/http'

export const getBrands = () => http.get<AxiosResponse<Brand[], any>>('/api/bb-brands', { params: { populate: '*' } })
export const getBrand = (id: string) =>
  http.get<AxiosResponse<Brand, any>>(`/api/bb-brands/${id}`, {
    params: {
      populate: 'deep, 4'
    }
  })
