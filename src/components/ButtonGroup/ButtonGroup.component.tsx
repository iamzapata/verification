import { Button } from '@components'
import type { Check, Answer } from '@store'
import { ANSWER_OPTIONS, useStore } from '@store'
import styles from './ButtonGroup.module.css'

const { YES, NO } = ANSWER_OPTIONS

interface ButtonGroupProps {
  inactive: boolean
  check: Check
}

function ButtonGroup({ inactive, check }: ButtonGroupProps) {
  const addAnswer = useStore(state => state.addAnswer)
  const { answer } = check

  const handleAction = (answer: Answer) => {
    addAnswer(check, answer)
  }

  return (
    <div className={styles.ButtonGroup}>
      <Button
        start
        inactive={inactive}
        onClick={() => handleAction(YES)}
        selected={answer === YES}
      >
        Yes
      </Button>
      <Button
        end
        inactive={inactive}
        onClick={() => handleAction(NO)}
        selected={answer === NO}
      >
        No
      </Button>
    </div>
  )
}

export { ButtonGroup }
