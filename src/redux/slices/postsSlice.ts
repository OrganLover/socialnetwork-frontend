import {IUser} from './authSlice'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from '../../api/api'

export const fetchPosts = createAsyncThunk('posts/posts', async () => {
  try {
    const {data} = await axios.get('posts')
    return data
  } catch (err) {
    console.warn(err)
  }
})

export const fetchOnePost = createAsyncThunk('posts/onePost', async (postId: string | undefined) => {
  const {data} = await axios.get(`posts/${postId}`)
  return data
})

export interface IPost {
  _id: string
  title: string
  text: string
  tags: []
  viewsCount: number
  user: IUser
  createdAt: string
  updatedAt: string
  __v: number
}

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  post: {
    item: {} as IPost,
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // posts case
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts.status = 'loading'
    })
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.items = action.payload
      state.posts.status = 'loaded'
    })
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts.status = 'loaded'
    })

    // one post case
    builder.addCase(fetchOnePost.pending, (state) => {
      state.post.status = 'loading'
    })
    builder.addCase(fetchOnePost.fulfilled, (state, action) => {
      state.post.item = action.payload
      state.post.status = 'loaded'
    })
    builder.addCase(fetchOnePost.rejected, (state) => {
      state.post.status = 'loaded'
    })
  },
})

export const postsReducer = postsSlice.reducer
