import create, { type StoreApi } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { fetchChecks, submitCheckResults } from '@api'
import type { Check, Answer } from './types'
import { ANSWER_OPTIONS } from './types'

interface State {
  meta: {
    isLoading: boolean
    hasError: boolean
    error: unknown | null
  }
  checks: Check[]
  selectedCheck: Check | null
  resultsSubmitted: boolean
}

interface Actions {
  getChecks: () => Promise<void>
  sendResults: () => Promise<void>
  setSelected: (check: Check) => void
  addAnswer: (check: Check, answer: Answer) => void
  isValid: () => boolean
  reset: () => void
}

export type Store = State & Actions

type SetState<T> = StoreApi<T>['setState']
type GetState<T> = StoreApi<T>['getState']

const getSorted = (checks: Check[]) =>
  checks.slice(0).sort((a, b) => a.priority - b.priority)

const initialState: State = {
  meta: {
    isLoading: true,
    hasError: false,
    error: null,
  },
  checks: [],
  selectedCheck: null,
  resultsSubmitted: false,
}

const createActions = (set: SetState<Store>, get: GetState<Store>) =>
  ({
    getChecks: async () => {
      try {
        const checks = <Check[]>await fetchChecks()
        const sorted = getSorted(checks)
        const checksInactive = sorted.map((check, i) => {
          return {
            ...check,
            inactive: i > 0,
            answer: ANSWER_OPTIONS.UNANSWERED,
          }
        })

        set({ checks: checksInactive })
      } catch (error: unknown) {
        // @ts-ignore: Issues with immer wrapper. Find a way to fix this
        set(state => {
          state.meta.error = error
          state.meta.hasError = true
        })
      } finally {
        // @ts-ignore: Issues with immer wrapper. Find a way to fix this
        set(state => {
          state.meta.isLoading = false
        })
      }
    },

    setSelected: selectedCheck => {
      set({ selectedCheck })
    },

    isValid: () => {
      const { checks } = get()

      if (!checks.length) return false

      const atLeastOneCheckIsNo = checks.some(
        check => check.answer === ANSWER_OPTIONS.NO
      )
      const allChecksAreYes = checks.every(
        check => check.answer === ANSWER_OPTIONS.YES
      )

      return atLeastOneCheckIsNo || allChecksAreYes
    },

    addAnswer: (checkAnswered, answer) => {
      const { checks } = get()

      if (!checks.length) return

      if (!checkAnswered) throw Error('Missing "checkAnswered" argument')
      if (!answer) throw Error('Missing "answer" argument')

      const currentIndex = checks.findIndex(i => i.id === checkAnswered.id)
      const nextIndex = currentIndex + 1
      const nextCheck = checks[currentIndex + 1]

      const newCheck = {
        ...checkAnswered,
        answer,
      }

      const newChecks = checks.map((check, index) => {
        if (check.id === newCheck.id) {
          return newCheck
        }

        if (answer === ANSWER_OPTIONS.YES && index == nextIndex) {
          return { ...nextCheck, inactive: false }
        }

        if (answer === ANSWER_OPTIONS.NO && index > currentIndex) {
          return { ...check, inactive: true, answer: ANSWER_OPTIONS.UNANSWERED }
        }

        return check
      })

      const sorted = getSorted(newChecks)

      set({ checks: sorted, selectedCheck: newCheck })
    },

    reset: () => {
      set(initialState)
    },

    sendResults: async () => {
      const { checks } = get()

      const checkResults = checks.map(({ id, answer }) => ({
        checkId: id,
        value: answer,
      }))

      try {
        // @ts-ignore: Issues with immer wrapper. Find a way to fix this
        set(state => {
          state.meta.isLoading = true
        })
        await submitCheckResults(checkResults)
        // @ts-ignore: Issues with immer wrapper. Find a way to fix this
        set(state => {
          state.resultsSubmitted = true
        })
      } catch (error) {
        // @ts-ignore: Issues with immer wrapper. Find a way to fix this
        set(state => {
          state.meta.error = error
          state.meta.hasError = true
        })
      } finally {
        // @ts-ignore: Issues with immer wrapper. Find a way to fix this
        set(state => {
          state.meta.isLoading = false
        })
      }
    },
  } as Actions)

const withImmer = immer<Store>((set, get) => ({
  ...initialState,
  ...createActions(set, get),
}))

const useStore = create(withImmer)

export { useStore }
