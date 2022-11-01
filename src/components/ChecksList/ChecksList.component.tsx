import styles from './ChecksList.module.css'
import { type Check } from '@api'
import { CheckItem } from '@components'

interface ChecksListProps {
  checks: Check[] | undefined
}

const ChecksList = ({ checks }: ChecksListProps) => {
  if (!checks) return null

  return (
    <section className={styles.ChecksList}>
      {checks.map((check) => (
        <CheckItem key={check.id} check={check} />
      ))}
    </section>
  )
}

export { ChecksList }