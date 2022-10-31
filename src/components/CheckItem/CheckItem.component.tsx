import styles from './CheckItem.module.css'
import { type Check } from '@api'
import { Button } from '@components'

interface CheckProps {
  check: Check
}
export function CheckItem({ check }: CheckProps) {
  const { description } = check

  return (
    <div className={styles.Check}>
      {description}
      <div>
        <Button>Yes</Button>
        <Button>No</Button>
      </div>
    </div>
  )
}

export { Check }
