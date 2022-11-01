import styles from './ButtonGroup.module.css'
import { Button } from '@components'

interface ButtonGroupProps {
  inactive: boolean
}

const ButtonGroup = ({ inactive }: ButtonGroupProps) => {
  console.log({ inactive })
  return (
    <div className={styles.ButtonGroup}>
      <Button start inactive={inactive}>
        Yes
      </Button>
      <Button end inactive={inactive}>
        No
      </Button>
    </div>
  )
}

export { ButtonGroup }
