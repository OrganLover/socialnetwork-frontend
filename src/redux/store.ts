import {configureStore} from '@reduxjs/toolkit'
import {authReducer} from './slices/authSlice'
import {useDispatch, TypedUseSelectorHook, useSelector} from 'react-redux'
import {postsReducer} from './slices/postsSlice'
import {usersReducer} from './slices/usersSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    users: usersReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store
