import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { StoreProps } from '@/common/typings/store'
import { getToken } from '@/common/utils/helpers/getTools'
import { SIO } from '../../../../../socket'

type RoomStatus = 'uninitialized' | 'existed' | 'created' | 'destroyed'

type WebRTCStatus =
  | 'uninitialized'
  | 'initializing'
  | 'connected'
  | 'disconnected'

export interface SystemState {
  logState: boolean
  currentPath: string
  connectWithAudioOnly: boolean
  errorMessage: string
  roomHost: boolean
  roomStatus: RoomStatus
  roomId: string
  roomParticipants: SIO.User[]
  WebRTCStatus: string
}

const initialSystemState: SystemState = {
  logState: getToken() !== null ? true : false,
  currentPath: '/',
  connectWithAudioOnly: true,
  errorMessage: '',
  roomHost: false,
  roomStatus: 'uninitialized',
  roomId: '',
  roomParticipants: [],
  WebRTCStatus: 'uninitialized',
}

export const systemSlice = createSlice({
  name: 'system',
  initialState: initialSystemState,
  reducers: {
    setLogState: (state, action: PayloadAction<boolean>) => {
      state.logState = action.payload
    },
    setCurrentPath: (state, action: PayloadAction<string>) => {
      state.currentPath = action.payload
    },
    setConnectWithAudioOnly: (state, action: PayloadAction<boolean>) => {
      state.connectWithAudioOnly = action.payload
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload
    },
    setRoomHost: (state, action: PayloadAction<boolean>) => {
      state.roomHost = action.payload
    },
    setRoomStatus: (state, action: PayloadAction<RoomStatus>) => {
      state.roomStatus = action.payload
    },
    setRoomId: (state, action: PayloadAction<string>) => {
      state.roomId = action.payload
    },
    setRoomParticipants: (state, action: PayloadAction<SIO.User[]>) => {
      state.roomParticipants = action.payload
    },
    setWebRTCStatus: (state, action: PayloadAction<WebRTCStatus>) => {
      state.WebRTCStatus = action.payload
    },
  },
})

export const {
  setLogState,
  setCurrentPath,
  setConnectWithAudioOnly,
  setErrorMessage,
  setRoomHost,
  setRoomStatus,
  setRoomId,
  setRoomParticipants,
  setWebRTCStatus,
} = systemSlice.actions

export const selectLogState = (state: StoreProps) => state.system.logState
export const selectCurrentPath = (state: StoreProps) => state.system.currentPath
export const selectConnectWithAudioOnly = (state: StoreProps) =>
  state.system.connectWithAudioOnly
export const selectErrorMessage = (state: StoreProps) =>
  state.system.errorMessage
export const selectRoomHost = (state: StoreProps) => state.system.roomHost
export const selectRoomStatus = (state: StoreProps) => state.system.roomStatus
export const selectRoomId = (state: StoreProps) => state.system.roomId
export const selectRoomParticipants = (state: StoreProps) =>
  state.system.roomParticipants
export const selectWebRTCStatus = (state: StoreProps) =>
  state.system.WebRTCStatus

export default systemSlice.reducer
