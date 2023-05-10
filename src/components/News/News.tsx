import React, {useEffect} from 'react'
import Posts from '../common/Posts'
import {useAppDispatch} from '../../redux/store'
import {fetchPosts} from '../../redux/slices/postsSlice'

function News() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  return (
    <div className='newsPage'>
      <div className='postsBlock'>
        <Posts />
      </div>
    </div>
  )
}

export default News
