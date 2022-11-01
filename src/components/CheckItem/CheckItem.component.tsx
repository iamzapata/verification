import styles from './CheckItem.module.css'
import { type Check } from '@api'
import { ButtonGroup } from '@components'

import { classNames } from '@utils'

interface CheckProps {
  check: Check
  inactive: boolean
}
export function CheckItem({ check, inactive }: CheckProps) {
  const { description } = check

  return (
    <div
      className={classNames(styles.CheckItem, inactive && styles.isInactive)}
    >
      {description}
      <ButtonGroup inactive={inactive} />
    </div>
  )
}

export { Check }
