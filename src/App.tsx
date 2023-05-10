import {useEffect} from 'react'
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Profile from './components/Profile/Profile'
import Friends from './components/Friends/Friends'
import News from './components/News/News'
import {useAppDispatch, useAppSelector} from './redux/store'
import {fetchAuthMe} from './redux/slices/authSlice'
import Users from './components/Users/Users'
import FullPost from './components/FullPost/FullPost'

function App() {
  const {pathname} = useLocation()
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const navigate = useNavigate()

  useEffect(() => {
    if (window.localStorage.getItem('token') !== null) {
      dispatch(fetchAuthMe())
    }

    if (!isAuth) {
      navigate('/login')
    }
  }, [])

  return (
    <div className='wrapper'>
      {pathname !== '/register' && pathname !== '/login' ? (
        <div className='main'>
          <Header />
          <Sidebar />
          <div className='mainContent'>
            <Routes>
              <Route path='/' element={<News />} />
              <Route path='/news' element={<News />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/friends' element={<Friends />} />
              <Route path='/users' element={<Users />} />
              <Route path='/full-post' element={<FullPost />}>
                <Route path='/full-post/:id' element={<FullPost />} />
              </Route>
            </Routes>
          </div>
        </div>
      ) : (
        <div className='authPages'>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
