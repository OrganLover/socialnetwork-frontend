import React, {useEffect} from 'react'
import avatar from '../../assets/images/testAvatarjpg.jpg'
import Posts from '../common/Posts'
import {useAppDispatch, useAppSelector} from '../../redux/store'
import {fetchPosts} from '../../redux/slices/postsSlice'

function Profile() {
  const user = useAppSelector((state) => state.auth.user)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  return (
    <div className='profilePage'>
      <div className='userData'>
        <div className='avatarBlock'>
          <img className='avatarImg' src={avatar} alt='avatar' />
        </div>
        <div className='userInfo'>
          <ul>
            <li>
              full name: <b>{user?.fullName}</b>
            </li>
            <li>
              age: <b>{user?.email}</b>
            </li>
            <li>city</li>
            <li>school</li>
          </ul>
        </div>
      </div>
      <Posts />
    </div>
  )
}

export default Profile
