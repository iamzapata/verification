import { useRequest } from '@utils'
import { fetchChecks, type Check } from '@api'
import { LoadingSpinner, Error, Submit, ChecksList } from '@components'
import styles from './ChecksContainer.module.css'

export function ChecksContainer() {
  const {
    isLoading,
    data: checks,
    isError,
  } = useRequest<Check[]>('fetchChecks', fetchChecks)

  if (isLoading) return <LoadingSpinner />

  if (isError) return <Error />

  return (
    <section className={styles.ChecksContainer}>
      <ChecksList checks={checks} />
      <Submit className={styles.Submit} />
    </section>
  )
}
