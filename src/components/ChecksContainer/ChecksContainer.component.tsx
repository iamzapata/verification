import type { Check } from '@store'
import {
  LoadingSpinner,
  Error,
  Submit,
  ChecksList,
  ResultsSubmitted,
} from '@components'
import styles from './ChecksContainer.module.css'

interface ChecksContainerProps {
  checks: Check[]
  isValid: boolean
  isLoading: boolean
  hasError: boolean
  resultsSubmitted: boolean
}
function ChecksContainer({
  checks,
  isValid,
  isLoading,
  hasError,
  resultsSubmitted,
}: ChecksContainerProps) {
  if (isLoading) return <LoadingSpinner />

  if (hasError) return <Error />

  if (resultsSubmitted) return <ResultsSubmitted />

  return (
    <section className={styles.ChecksContainer}>
      <ChecksList checks={checks} />
      <Submit className={styles.Submit} disabled={!isValid} />
    </section>
  )
}

export { ChecksContainer }
