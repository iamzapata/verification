import { classNames } from '@utils'
import type { Check } from '@store'
import { ButtonGroup } from '@components'
import styles from './CheckItem.module.css'

interface CheckProps {
  check: Check
  selected: boolean
}
function CheckItem({ check, selected }: CheckProps) {
  const { description, inactive } = check

  return (
    <div
      className={classNames(
        styles.CheckItem,
        inactive && styles.isInactive,
        selected && styles.isSelected
      )}
    >
      {description}
      <ButtonGroup inactive={inactive} check={check} />
    </div>
  )
}

export { CheckItem }
