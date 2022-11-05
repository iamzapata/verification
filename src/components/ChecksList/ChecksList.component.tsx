import { useEffect, useRef } from 'react'
import styles from './ChecksList.module.css'
import { type Check } from '@store'
import { CheckItem } from '@components'
import { useStore, ANSWER_OPTIONS } from '@store'

interface ChecksListProps {
  checks: Check[]
}
function ChecksList({ checks }: ChecksListProps) {
  const setSelected = useStore(state => state.setSelected)
  const selectedCheck = useStore(state => state.selectedCheck)
  const index = useRef(0)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const { key } = e

      if ('ArrowUp' === key) {
        if (index.current === 0) return

        index.current--

        setSelected(checks[index.current])
      }

      if ('ArrowDown' === key) {
        if (index.current === checks.length - 1) return

        const canSelectNext = selectedCheck?.answer === ANSWER_OPTIONS.YES

        if (canSelectNext) {
          index.current++
          setSelected(checks[index.current])
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
    // Don't feel great about the stringifying here, but it works for now
  }, [JSON.stringify(checks), selectedCheck?.id])

  return (
    <section className={styles.ChecksList}>
      {checks.map(check => (
        <CheckItem
          key={check.id}
          check={check}
          selected={selectedCheck?.id === check.id}
        />
      ))}
    </section>
  )
}

export { ChecksList }
