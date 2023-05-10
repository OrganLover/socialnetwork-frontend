import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from '../../api/api'

export const fetchUsers = createAsyncThunk('users/users', async () => {
  try {
    const {data} = await axios.get('/users')
    return data
  } catch (err) {
    console.warn(err)
  }
})

const initialState = {
  users: [],
  status: 'loading',
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = 'loaded'
      state.users = action.payload
    })
    builder.addCase(fetchUsers.rejected, (state) => {
      state.status = 'error'
    })
  },
})

export const usersReducer = usersSlice.reducer
