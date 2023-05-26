import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getJwtToLocalStorage } from '~/utils/utils'

// Define a type for the slice state
interface AuthState {
  isAuthentication: boolean
}

// Define the initial state using that type
const initialState: AuthState = {
  isAuthentication: Boolean(getJwtToLocalStorage())
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    saveJwtToLocalStorage: (
      state,
      action: PayloadAction<{
        jwt: string
        user: {
          id: number
          username: string
          email: string
          phone: string
        }
      }>
    ) => {
      localStorage.setItem('jwt', action.payload.jwt)
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      state.isAuthentication = true
    },
    removeJwtToLocalStorage: (state) => {
      localStorage.removeItem('jwt')
      localStorage.removeItem('user')
      state.isAuthentication = false
    }
  }
})

export const { saveJwtToLocalStorage, removeJwtToLocalStorage } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
const authReducer = authSlice.reducer

export default authReducer
