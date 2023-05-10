import React, {useEffect} from 'react'
import {fetchUsers} from '../../redux/slices/usersSlice'
import {useAppDispatch, useAppSelector} from '../../redux/store'
import {IUser, fetchFollow} from '../../redux/slices/authSlice'

function Users() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const users = useAppSelector((state) => state.users.users)
  console.log(users)

  return (
    <div className='friendsPage'>
      <div className='friendsBlock'>
        {users.map((user: IUser) => {
          return (
            <div className='friendBlock'>
              <div className='friendInfo'>
                <div>{user.fullName}</div>
                <div>{user.email}</div>
              </div>
              <div className='friendButtons'>
                <button>Написать</button>
                <button onClick={() => dispatch(fetchFollow(user._id))}>Подписаться</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Users
