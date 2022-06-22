import React from 'react'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './errorWrap-styles.scss'

const ErrorWrap: React.FC = () => {
  return (
    <div className={styles.errorWrap}>
      <FontAwesomeIcon beatFade className={styles.ellipsis} icon={faEllipsis} />
      <span className={styles.error}>Erro</span>
    </div>
  )
}

export default ErrorWrap
