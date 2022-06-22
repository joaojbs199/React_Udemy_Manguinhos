import React, { useContext } from 'react'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './errorWrap-styles.scss'
import Context from '@/presentation/contexts/login-form/login-form-context'

const ErrorWrap: React.FC = () => {
  const { isLoading, errorMessage } = useContext(Context)
  return (
    <div data-testid='errorWrap' className={styles.errorWrap}>
      {isLoading && <FontAwesomeIcon beatFade className={styles.ellipsis} icon={faEllipsis} />}
      { errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </div>
  )
}

export default ErrorWrap
