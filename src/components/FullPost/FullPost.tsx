import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../redux/store'
import {fetchOnePost} from '../../redux/slices/postsSlice'
import avatar from '../../assets/images/testAvatarjpg.jpg'

function FullPost() {
  const {id} = useParams()

  const dispatch = useAppDispatch()

  const post = useAppSelector((state) => state.posts.post.item)

  useEffect(() => {
    dispatch(fetchOnePost(id))
  }, [])

  return (
    <div className='fullPostPage'>
      <div className='profilePost' key={post._id}>
        <div className='postAvatarBlock postBlock'>
          <img className='postAvatar' src={avatar} alt='postAvatar' />
        </div>
        <div className='postTitle postBlock'>{post.title}</div>
        <div className='postText postBlock'>{post.text}</div>
        <div className='postButtons postBlock'>
          <span>views {post.viewsCount}</span>
          <button>likes</button>
        </div>
      </div>
    </div>
  )
}

export default FullPost
