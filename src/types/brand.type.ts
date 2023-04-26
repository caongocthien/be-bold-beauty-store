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
          formats: {
            small: {
              ext: string
              url: string
              hash: string
              mime: string
              name: string
              path: string | null
              size: number
              width: number
              height: number
              provider_metadata: {
                public_id: string
                resource_type: string
              }
            }
            medium: {
              ext: string
              url: string
              hash: string
              mime: string
              name: string
              path: string | null
              size: number
              width: number
              height: number
              provider_metadata: {
                public_id: string
                resource_type: string
              }
            }
            thumbnail: {
              ext: string
              url: string
              hash: string
              mime: string
              name: string
              path: string | null
              size: number
              width: number
              height: number
              provider_metadata: {
                public_id: string
                resource_type: string
              }
            }
          }
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
  }
}
