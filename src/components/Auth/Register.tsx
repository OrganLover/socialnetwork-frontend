import {useEffect} from 'react'
import {Form, Field} from 'react-final-form'
import {composeValidators, required, minValue} from '../../utils/validators'
import {createComponent} from '../common/FormControls'
import {useAppDispatch, useAppSelector} from '../../redux/store'
import {fetchRegister} from '../../redux/slices/authSlice'
import {IRegister} from '../../redux/slices/authSlice'
import {Link, useNavigate} from 'react-router-dom'

function Register() {
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
        <span className='authTitle'>Регистрация</span>
        <RegisterForm />
        <div>
          <Link to='/login'>Есть аккаунт? Авторизуйся</Link>
        </div>
      </div>
    </div>
  )
}

function RegisterForm() {
  const dispatch = useAppDispatch()
  const Input = createComponent('div', 'input')

  const onSubmit = (values: IRegister) => {
    dispatch(fetchRegister(values))
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({handleSubmit, form, submitting, pristine, values, submitError}) => (
        <form onSubmit={handleSubmit}>
          <div className='loginForm'>
            <Field
              name='fullName'
              component={Input}
              validate={composeValidators(required, minValue(3))}
              className='textField'
              placeholder='Full name'
              initialValue='Cors'
            />
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
              Register
            </button>
          </div>
        </form>
      )}
    />
  )
}

export default Register
