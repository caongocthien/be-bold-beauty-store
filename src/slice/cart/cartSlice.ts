import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Cart } from '~/types/cart.type'

interface CartState {
  cart: Cart | undefined
}

const initialState: CartState = {
  cart: undefined
}
export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    getCart: (state, action: PayloadAction<Cart | undefined>) => {
      state.cart = action.payload
    }
  }
})

export const { getCart } = cartSlice.actions

const cartReducer = cartSlice.reducer
export default cartReducer
