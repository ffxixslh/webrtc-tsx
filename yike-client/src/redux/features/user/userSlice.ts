import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getToken, getUserInfo } from '@/common/utils/helpers/getTools'
import { StoreProps } from '@/common/typings/store'
import { removeItem } from '@/common/utils/storage'

export interface UserState {
  token: string
  userInfo: {
    username: string
    password: string
  }
}

const initialUserState: UserState = {
  token: getToken() ?? '',
  userInfo: getUserInfo() ?? {
    username: 'default-username',
    password: 'default-password',
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    removeToken: (state) => {
      state.token = ''
      removeItem('token')
    },
    setUserInfo: (state, action: PayloadAction<UserState['userInfo']>) => {
      state.userInfo = action.payload
    },
    removeUserInfo: (state) => {
      state.userInfo = {
        username: 'default-username',
        password: 'default-password',
      }
      removeItem('userInfo')
    },
  },
})

export const { setToken, removeToken, setUserInfo, removeUserInfo } =
  userSlice.actions

export const selectToken = (state: StoreProps) => state.user.token
export const selectUserInfo = (state: StoreProps) => state.user.userInfo

export default userSlice.reducer
