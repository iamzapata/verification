import styles from './Button.module.css'
import { classNames } from '@utils'
interface ButtonProps {
  children: JSX.Element | string
  className?: string
  selected?: boolean
  disabled?: boolean
  inactive?: boolean
  start?: boolean
  end?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
  onClick?: () => void
}

function Button({
  children,
  className = '',
  selected = false,
  disabled = false,
  inactive = false,
  start = false,
  end = false,
  type = 'button',
  onClick,
}: ButtonProps) {
  return (
    <button
      className={classNames(
        styles.Button,
        selected ? styles.isSelected : styles.isUnselected,
        inactive && styles.isInactive,
        start && styles.isStart,
        end && styles.isEnd,
        className
      )}
      disabled={disabled}
      type={type}
      onClick={onClick}
      tabIndex={inactive ? -1 : 0}
    >
      {children}
    </button>
  )
}

export { Button }
