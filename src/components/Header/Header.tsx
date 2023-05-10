import React from 'react'
import {Link} from 'react-router-dom'
import {useAppSelector, useAppDispatch} from '../../redux/store'
import {useNavigate} from 'react-router-dom'
import {logout} from '../../redux/slices/authSlice'

function Header() {
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  return (
    <div className='header'>
      <div>
        <span>LO GO</span>
      </div>
      <div>
        <Link to='/login'>
          {isAuth ? (
            <span onClick={() => dispatch(logout())}>Выйти</span>
          ) : (
            <span onClick={() => navigate('/login')}>Войти</span>
          )}
        </Link>
        <Link to='/add-post'>Добавить пост</Link>
      </div>
    </div>
  )
}

export default Header
