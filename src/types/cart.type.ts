import { Product } from './product.type'
import { User } from './user.type'

export interface Cart {
  id: number
  attributes: {
    users_permissions_user: {
      data: User
    }
    cart_item: CartItem[]
  }
}

export interface CartItem {
  id: number
  quantity: number
  bb_product: {
    data: Product
  }
}
