import React from 'react'
import {NavLink} from 'react-router-dom'

function Sidebar() {
  return (
    <div className='sidebar'>
      <ul>
        <li>
          <NavLink to='/profile'>Моя страница</NavLink>
        </li>
        <li>
          <NavLink to='/news'>Новости</NavLink>
        </li>
        <li>
          <NavLink to='/friends'>Друзья</NavLink>
        </li>
        <li>
          <NavLink to='/users'>Пользователи</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
