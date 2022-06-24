import React, { useContext } from 'react'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './errorWrap-styles.scss'
import Context from '@/presentation/contexts/login-form/login-form-context'

const ErrorWrap: React.FC = () => {
  const { state } = useContext(Context)
  const { isLoading, mainError } = state
  return (
    <div data-testid='errorWrap' className={styles.errorWrap}>
      {isLoading && <FontAwesomeIcon data-testid='loader' beatFade className={styles.loader} icon={faEllipsis} />}
      { mainError && <span data-testid='mainError' className={styles.error}>{mainError}</span>}
    </div>
  )
}

export default ErrorWrap
