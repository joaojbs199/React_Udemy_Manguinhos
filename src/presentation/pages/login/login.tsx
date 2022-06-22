import React from 'react'
import styles from './login-styles.scss'
import Header from '@/presentation/components/login-header/login-header'
import Footer from '@/presentation/components/footer/footer'
import ErrorWrap from '@/presentation/components/errorWrap/errorWrap'

const Login: React.FC = () => {
  return (
    <div className={styles.login}>
      <Header />
      <form className={styles.form}>
        <h2>Login</h2>
        <input type='email' name='email' placeholder='Digite seu email' />
        <input type='password' name='password' placeholder='Digite sua senha' />
        <button type="submit">Entrar</button>
        <span className={styles.link}>Criar conta</span>
        <ErrorWrap />
      </form>

      <Footer />
    </div>
  )
}

export default Login
