import { classNames } from '@utils'
import type { Check } from '@store'
import { ButtonGroup } from '@components'
import styles from './CheckItem.module.css'

interface CheckProps {
  check: Check
}
function CheckItem({ check }: CheckProps) {
  const { description, inactive } = check

  return (
    <div
      className={classNames(styles.CheckItem, inactive && styles.isInactive)}
    >
      {description}
      <ButtonGroup inactive={inactive} check={check} />
    </div>
  )
}

export { CheckItem }
