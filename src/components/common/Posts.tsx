import avatar from '../../assets/images/testAvatarjpg.jpg'
import {useAppSelector} from '../../redux/store'
import {IPost} from '../../redux/slices/postsSlice'
import {useNavigate} from 'react-router-dom'

function Posts() {
  const posts: Array<IPost> = useAppSelector((state) => state.posts.posts.items)
  const navigate = useNavigate()

  return (
    <div className='profilePosts'>
      {posts?.map((post) => {
        return (
          <div className='profilePost' key={post._id} onClick={() => navigate(`/full-post/${post._id}`)}>
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
        )
      })}
    </div>
  )
}

export default Posts
