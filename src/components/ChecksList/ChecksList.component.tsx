import styles from './ChecksList.module.css'
import { type Check } from 'src/store'
import { CheckItem } from '@components'

interface ChecksListProps {
  checks: Check[]
}
function ChecksList({ checks }: ChecksListProps) {
  return (
    <section className={styles.ChecksList}>
      {checks.map(check => (
        <CheckItem key={check.id} check={check} />
      ))}
    </section>
  )
}

export { ChecksList }
