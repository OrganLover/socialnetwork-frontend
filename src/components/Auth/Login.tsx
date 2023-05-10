import {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../redux/store'
import {createComponent} from '../common/FormControls'
import {ILogin, fetchLogin} from '../../redux/slices/authSlice'
import {Form, Field} from 'react-final-form'
import {composeValidators, minValue, required} from '../../utils/validators'

function Login() {
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) {
      navigate('/')
    }
  }, [isAuth])

  return (
    <div className='authPage'>
      <div className='authBlock'>
        <span className='authTitle'>Войти в аккаунт</span>
        <LoginForm />
        <div>
          <Link to='/register'>Нет аккаунта? Зарегистрируйся</Link>
        </div>
      </div>
    </div>
  )
}

function LoginForm() {
  const dispatch = useAppDispatch()
  const Input = createComponent('div', 'input')

  const onSubmit = (values: ILogin) => {
    dispatch(fetchLogin(values))
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({handleSubmit, form, submitting, pristine, values, submitError}) => (
        <form onSubmit={handleSubmit}>
          <div className='loginForm'>
            <Field
              name='email'
              component={Input}
              validate={required}
              className='textField'
              placeholder='Email'
              initialValue='Cors@mail.com'
              // type='email'
            />
            <Field
              name='password'
              component={Input}
              validate={composeValidators(required, minValue(8))}
              className='textField'
              placeholder='Password'
              initialValue='CorsCors'
              // type='password'
            />
            {submitError && <div className='submissionError'>{submitError}</div>}
            <button id='loginButton' disabled={submitting}>
              Login
            </button>
          </div>
        </form>
      )}
    />
  )
}

export default Login
