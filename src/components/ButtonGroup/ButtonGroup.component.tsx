import { Button } from '@components'
import type { Check, Answer } from '@store'
import { ANSWER_OPTIONS, useStore } from '@store'
import { useEffect } from 'react'
import styles from './ButtonGroup.module.css'

const { YES, NO } = ANSWER_OPTIONS

interface ButtonGroupProps {
  inactive: boolean
  check: Check
}

function ButtonGroup({ inactive, check }: ButtonGroupProps) {
  const addAnswer = useStore(state => state.addAnswer)
  const selectedCheck = useStore(state => state.selectedCheck)
  const { answer } = check
  const selected = selectedCheck?.id === check.id

  const handleAction = (answer: Answer) => {
    addAnswer(check, answer)
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const { key } = e

      if (!selected || inactive) return

      if (key === '1') {
        addAnswer(check, YES)
      }

      if (key === '2') {
        addAnswer(check, NO)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [inactive, selected])

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
