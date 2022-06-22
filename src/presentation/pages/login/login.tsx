import React, { useState } from 'react'
import styles from './login-styles.scss'
import { Header, ErrorWrap, Footer } from '@/presentation/components'
import Context from '@/presentation/contexts/login-form/login-form-context'

type FormStatusType = {
  isLoading: boolean
  errorMessage: string
}

const Login: React.FC = () => {
  const [formStatus] = useState<FormStatusType>({
    isLoading: false,
    errorMessage: ''
  })

  return (
    <div className={styles.login}>
      <Header />
      <Context.Provider value={formStatus}>
        <form className={styles.form}>
          <h2>Login</h2>
          <input autoComplete='off' type='email' name='email' placeholder='Digite seu email' />
          <input autoComplete='off' type='password' name='password' placeholder='Digite sua senha' />
          <button type="submit">Entrar</button>
          <span className={styles.link}>Criar conta</span>
          <ErrorWrap />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default Login
