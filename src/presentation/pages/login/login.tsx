import React, { useState, useEffect } from 'react'
import styles from './login-styles.scss'
import { Header, ErrorWrap, Footer } from '@/presentation/components'
import Context from '@/presentation/contexts/login-form/login-form-context'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/useCases'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    mainError: '',
    emailError: '',
    passwordError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  const handleInputChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (state.isLoading || state.emailError || state.passwordError) return
    setState({
      ...state,
      isLoading: true
    })
    await authentication.auth({
      email: state.email,
      password: state.password
    })
  }

  return (
    <div className={styles.login}>
      <Header />
      <Context.Provider value={{ state, setState }}>
        <form data-testid='loginForm' className={styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input
            data-testid='email'
            autoComplete='off'
            type='email'
            name='email'
            placeholder='Digite seu email'
            onChange={handleInputChange}
          />
          <span data-testid='emailError' className={styles.inputError}>{state.emailError}</span>
          <input
            data-testid='password'
            autoComplete='off'
            type='password'
            name='password'
            placeholder='Digite sua senha'
            onChange={handleInputChange}
          />
          <span data-testid='passwordError' className={styles.inputError}>{state.passwordError}</span>
          <button
            className={styles.submit}
            data-testid='submit'
            disabled={!!state.emailError || !!state.passwordError}
            type="submit">
              Entrar
          </button>
          <span className={styles.link}>Criar conta</span>
          <ErrorWrap />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default Login
