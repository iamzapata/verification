import { memo } from 'react'
import { Button } from '@components'
import { classNames } from '@utils'
import styles from './Submit.module.css'

interface SubmitProps {
  className: string
  isValid: boolean
}

const Submit = memo(function Submit({ className, isValid }: SubmitProps) {
  return (
    <Button
      className={classNames(styles.Submit, className)}
      disabled={!isValid}
    >
      Submit
    </Button>
  )
})

export { Submit }
