import styles from './Button.module.css'

interface ButtonProps {
  children: JSX.Element
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
  onClick?: () => void
}

const Button = ({
  children,
  disabled = false,
  type = 'button',
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={styles.Button}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export { Button }
