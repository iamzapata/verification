import { useEffect } from 'react'
import { LoadingSpinner, Error, Submit, ChecksList } from '@components'
import { useStore } from '@store'
import styles from './ChecksContainer.module.css'

function ChecksContainer() {
  const checks = useStore(state => state.checks)
  const { isLoading, hasError } = useStore(state => state.meta)
  const isValid = useStore(state => state.isValid)
  const fetch = useStore(state => state.fetch)

  useEffect(() => {
    void fetch()
  }, [])

  if (isLoading) return <LoadingSpinner />

  if (hasError) return <Error />

  return (
    <section className={styles.ChecksContainer}>
      <ChecksList checks={checks} />
      <Submit className={styles.Submit} isValid={isValid()} />
    </section>
  )
}

export { ChecksContainer }
