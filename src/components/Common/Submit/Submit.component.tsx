import { memo } from 'react'
import { Button } from '@components'
import { classNames } from '@utils'
import { useStore } from '@store'
import styles from './Submit.module.css'

interface SubmitProps {
  className?: string
  disabled: boolean
}

const Submit = memo(function Submit({ className, disabled }: SubmitProps) {
  const sendResults = useStore(state => state.sendResults)

  const handleSubmit = () => {
    void sendResults()
  }

  return (
    <Button
      className={classNames(styles.Submit, className)}
      disabled={disabled}
      onClick={handleSubmit}
    >
      Submit
    </Button>
  )
})

export { Submit }
