import type { Check } from '@store'
import { LoadingSpinner, Error, Submit, ChecksList } from '@components'
import styles from './ChecksContainer.module.css'

interface ChecksContainerProps {
  checks: Check[]
  isValid: boolean
  isLoading: boolean
  hasError: boolean
}
function ChecksContainer({
  checks,
  isValid,
  isLoading,
  hasError,
}: ChecksContainerProps) {
  if (isLoading) return <LoadingSpinner />

  if (hasError) return <Error />

  return (
    <section className={styles.ChecksContainer}>
      <ChecksList checks={checks} />
      <Submit className={styles.Submit} disabled={!isValid} />
    </section>
  )
}

export { ChecksContainer }
