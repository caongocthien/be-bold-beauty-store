import { Product } from './product.type'

export interface Brand {
  id: number
  attributes: {
    name: string
    description: string | null
    createdAt: string
    updatedAt: string
    publishedAt: string
    logo: {
      data: {
        id: number
        attributes: {
          name: string
          alternativeText: string | null
          caption: string | null
          width: number
          height: number
          hash: string
          ext: string
          mime: string
          size: number
          url: string
          previewUrl: string | null
          provider: string
          provider_metadata: {
            public_id: string
            resource_type: string
          }
          createdAt: string
          updatedAt: string
        }
      }
    }
    bb_products: {
      data: Product[]
    }
  }
}
