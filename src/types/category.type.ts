import { Product } from './product.type'

export interface Category {
  id: number
  attributes: {
    name: string
    description: null
    createdAt: string
    updatedAt: string
    publishedAt: string
    bb_products: {
      data: Product[]
    }
  }
}
