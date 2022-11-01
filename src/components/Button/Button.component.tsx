import styles from './Button.module.css'
import { classNames } from '@utils'
interface ButtonProps {
  children: JSX.Element | string
  className?: string
  active?: boolean
  disabled?: boolean
  start?: boolean
  end?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
  onClick?: () => void
}

const Button = ({
  children,
  className = '',
  active = false,
  disabled = false,
  start = false,
  end = false,
  type = 'button',
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        styles.Button,
        active ? styles.isActive : styles.isInactive,
        start && styles.isStart,
        end && styles.isEnd,
        className
      )}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export { Button }
