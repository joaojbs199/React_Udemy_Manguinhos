import React, { useState, useEffect } from 'react'
import styles from './login-styles.scss'
import { Header, ErrorWrap, Footer } from '@/presentation/components'
import Context from '@/presentation/contexts/login-form/login-form-context'
import { Validation } from '@/presentation/protocols/validation'

type Props = {
  validation?: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    mainError: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório'
  })

  useEffect(() => {
    validation.validate({ email: state.email })
  }, [state.email])

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className={styles.login}>
      <Header />
      <Context.Provider value={{ state, setState }}>
        <form className={styles.form}>
          <h2>Login</h2>
          <input
            data-testid='email'
            autoComplete='off'
            type='email'
            name='email'
            placeholder='Digite seu email'
            onChange={handleChange}
          />
          {state.emailError && <span data-testid='emailError' className={styles.inputError}>{state.emailError}</span>}
          <input
            data-testid='password'
            autoComplete='off'
            type='password'
            name='password'
            placeholder='Digite sua senha'
          />
          {state.passwordError && <span data-testid='passwordError' className={styles.inputError}>{state.passwordError}</span>}
          <button className={styles.submit} data-testid='submit' disabled type="submit">Entrar</button>
          <span className={styles.link}>Criar conta</span>
          <ErrorWrap />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default Login
