import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CartItem } from '~/types/cart.type'

interface CartState {
  cart: CartItem[] | undefined
}

const initialState: CartState = {
  cart: undefined
}
export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    getCart: (state, action: PayloadAction<CartItem[] | undefined>) => {
      state.cart = action.payload
    }
  }
})

export const { getCart } = cartSlice.actions

const cartReducer = cartSlice.reducer
export default cartReducer
