import styles from './Button.module.css'
import { classNames } from '@utils'
interface ButtonProps {
  children: JSX.Element | string
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
  onClick?: () => void
}

const Button = ({
  children,
  className = '',
  disabled = false,
  type = 'button',
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={classNames(styles.Button, className)}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export { Button }
