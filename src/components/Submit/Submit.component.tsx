import { Button } from '@components'
import { classNames } from '@utils'
import styles from './Submit.module.css'

interface SubmitProps {
  className: string
}

const Submit = ({ className }: SubmitProps) => {
  return (
    <Button className={classNames(styles.Submit, className)}>Submit</Button>
  )
}

export { Submit }
