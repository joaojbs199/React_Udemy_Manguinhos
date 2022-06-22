import React, { memo } from 'react'
import styles from './login-header-styles.scss'
import { Logo } from '@/presentation/components'

const LoginHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <h1>4Dev - Enquetes para programamdores</h1>
    </header>
  )
}

export default memo(LoginHeader)
