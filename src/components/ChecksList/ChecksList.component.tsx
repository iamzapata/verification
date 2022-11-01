import styles from './ChecksList.module.css'
import { type Check } from '@api'
import { CheckItem } from '@components'

interface ChecksListProps {
  checks: Check[] | undefined
}
const ChecksList = ({ checks }: ChecksListProps) => {
  if (!checks) return null

  const sortedChecks = checks.slice(0).sort((a, b) => +a.priority - +b.priority)

  return (
    <section className={styles.ChecksList}>
      {sortedChecks.map((check) => (
        <CheckItem key={check.id} check={check} />
      ))}
    </section>
  )
}

export { ChecksList }
