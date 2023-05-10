import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../api/api'

export interface IRegister {
  fullName: string
  email: string
  password: string
}

export interface ILogin {
  email: string
  password: string
}

export const fetchRegister = createAsyncThunk('auth/getRegistered', async (userData: IRegister) => {
  try {
    const {data} = await axios.post('auth/register', userData)
    console.log(data)
    return data
  } catch (err) {
    console.warn(err)
  }
})

export const fetchLogin = createAsyncThunk('auth/login', async (userData: ILogin) => {
  try {
    const {data} = await axios.post('auth/login', userData)
    console.log(data)
    return data
  } catch (err) {
    console.warn(err)
  }
})

export const fetchAuthMe = createAsyncThunk('auth/authMe', async () => {
  try {
    const {data} = await axios.get('auth/me')
    return data
  } catch (err) {
    console.warn(err)
  }
})

export const fetchFollow = createAsyncThunk('auth/follow', async (id: string) => {
  try {
    const {data} = await axios.patch(`follow/${id}`)
    console.log(data)
    return data
  } catch (err) {
    console.warn(err)
  }
})

export interface IUser {
  _id: string
  fullName: string
  email: string
  token: string
  createdAt: string
  updatedAt: string
  __v: number
}

interface IAuthState {
  user: IUser | null
  status: string
  isAuth: boolean
}

const initialState = {
  user: {},
  status: 'loading',
  isAuth: false,
} as IAuthState

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.isAuth = false
      window.localStorage.removeItem('token')
    },
  },
  extraReducers: (builder) => {
    // register case
    builder.addCase(fetchRegister.pending, (state) => {
      state.status = 'loading'
      state.isAuth = false
    })
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.status = 'loaded'
      state.user = action.payload!
      state.isAuth = true
      window.localStorage.setItem('token', state.user?.token!)
    })
    builder.addCase(fetchRegister.rejected, (state) => {
      state.status = 'error'
      state.isAuth = false
    })

    // login case
    builder.addCase(fetchLogin.pending, (state) => {
      state.status = 'loading'
      state.isAuth = false
    })
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.status = 'loaded'
      state.user = action.payload!
      state.isAuth = true
      window.localStorage.setItem('token', state.user?.token!)
    })
    builder.addCase(fetchLogin.rejected, (state) => {
      state.status = 'error'
      state.isAuth = false
    })

    // authMe case
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.status = 'loading'
      state.isAuth = false
    })
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.status = 'loaded'
      state.user = action.payload!
      state.isAuth = state.user?._id ? true : false
    })
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.status = 'error'
      state.isAuth = false
    })

    // follow case
    builder.addCase(fetchFollow.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchFollow.fulfilled, (state, action) => {
      state.status = 'loaded'
    })
    builder.addCase(fetchFollow.rejected, (state) => {
      state.status = 'error'
    })
  },
})

export const authReducer = authSlice.reducer
export const {logout} = authSlice.actions
