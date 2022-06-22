import React, { useState } from 'react'
import styles from './login-styles.scss'
import { Header, ErrorWrap, Footer } from '@/presentation/components'
import Context from '@/presentation/contexts/login-form/login-form-context'

const Login: React.FC = () => {
  const [formStatus] = useState({
    isLoading: false,
    mainError: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório'
  })

  return (
    <div className={styles.login}>
      <Header />
      <Context.Provider value={formStatus}>
        <form className={styles.form}>
          <h2>Login</h2>
          <input autoComplete='off' type='email' name='email' placeholder='Digite seu email' />
          {formStatus.emailError && <span data-testid='emailError' className={styles.inputError}>{formStatus.emailError}</span>}
          <input autoComplete='off' type='password' name='password' placeholder='Digite sua senha' />
          {formStatus.passwordError && <span data-testid='passwordError' className={styles.inputError}>{formStatus.passwordError}</span>}
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
