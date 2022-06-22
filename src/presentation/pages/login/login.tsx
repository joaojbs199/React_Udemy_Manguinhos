import React from 'react'
import styles from './login-styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import Logo from '@/presentation/components/logo/logo'

const Login: React.FC = () => {
  return (
    <div className={styles.login}>
      <header className={styles.header}>
        <Logo />
        <h1>4Dev - Enquetes para programamdores</h1>
      </header>
      <form className={styles.form}>
        <h2>Login</h2>
        <input type='email' name='email' placeholder='Digite seu email' />
        <input type='password' name='password' placeholder='Digite sua senha' />
        <button type="submit">Entrar</button>
        <span className={styles.link}>Criar conta</span>
        <div className={styles.errorWrap}>
          <FontAwesomeIcon beatFade className={styles.ellipsis} icon={faEllipsis} />
          <span className={styles.error}>Erro</span>
        </div>
      </form>

      <footer className={styles.footer} />
    </div>
  )
}

export default Login
