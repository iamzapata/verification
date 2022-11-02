import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { type Validation, fetchChecks } from '@api'

export interface Check extends Validation {
  inactive: boolean
  answer: keyof AnswerOption
}

type AnswerOption = typeof ANSWER_OPTIONS

export type Answer = keyof AnswerOption

export const ANSWER_OPTIONS = {
  YES: 'YES',
  NO: 'NO',
  UNANSWERED: 'UNANSWERED',
} as const

interface State {
  meta: {
    isLoading: boolean
    hasError: boolean
    error: unknown | null
  }
  checks: Check[]
}

interface Actions {
  fetch: () => Promise<void>
  addAnswer: (check: Check, answer: Answer) => void
  isValid: () => boolean
}

const initialState = {
  meta: {
    isLoading: true,
    hasError: false,
    error: null,
  },
  checks: [],
}

const withImmer = immer<State & Actions>((set, get) => ({
  ...initialState,

  isValid: () => {
    const { checks } = get()

    const atLeastOneCheckIsNo = checks.some(
      check => check.answer === ANSWER_OPTIONS.NO
    )
    const allChecksAreYes = checks.every(
      check => check.answer === ANSWER_OPTIONS.YES
    )

    return atLeastOneCheckIsNo || allChecksAreYes
  },

  fetch: async () => {
    try {
      const checks = <Check[]>await fetchChecks()
      const sorted = checks.slice(0).sort((a, b) => a.priority - b.priority)
      const checksInactive = sorted.map((check, i) => {
        return {
          ...check,
          inactive: i > 0,
          answer: ANSWER_OPTIONS.UNANSWERED,
        }
      })

      set({ checks: checksInactive })
    } catch (error: unknown) {
      set(state => {
        state.meta.error = error
        state.meta.hasError = true
      })
    } finally {
      set(state => {
        state.meta.isLoading = false
      })
    }
  },

  addAnswer: (checkAnswered, answer) => {
    const { checks } = get()

    const currentIndex = checks.findIndex(i => i.id === checkAnswered.id)
    const nextItemId = checks[currentIndex + 1]?.id

    const newChecks = checks.map(check => {
      if (check.id === checkAnswered.id) {
        return {
          ...check,
          answer,
        }
      }

      if (check.id === nextItemId) {
        return {
          ...check,
          inactive: false,
        }
      }

      return check
    })

    set({ checks: newChecks })
  },
}))

const useStore = create(withImmer)

export { useStore }
