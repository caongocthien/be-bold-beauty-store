import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '~/store'
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
    saveJwtToLocalStorage: (state, action: PayloadAction<string>) => {
      localStorage.setItem('jwt', action.payload)
      state.isAuthentication = true
    },
    removeJwtToLocalStorage: (state) => {
      localStorage.removeItem('jwt')
      state.isAuthentication = false
    }
  }
})

export const { saveJwtToLocalStorage, removeJwtToLocalStorage } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
const authReducer = authSlice.reducer

export default authReducer
