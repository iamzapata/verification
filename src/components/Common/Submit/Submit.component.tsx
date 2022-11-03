import { memo } from 'react'
import { Button } from '@components'
import { classNames } from '@utils'
import styles from './Submit.module.css'

interface SubmitProps {
  className: string
  disabled: boolean
}

const Submit = memo(function Submit({ className, disabled }: SubmitProps) {
  return (
    <Button
      className={classNames(styles.Submit, className)}
      disabled={disabled}
    >
      Submit
    </Button>
  )
})

export { Submit }
