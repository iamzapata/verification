import create, { type StoreApi } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { fetchChecks } from '@api'
import type { Check, Answer } from './types'
import { ANSWER_OPTIONS } from './types'

interface State {
  meta: {
    isLoading: boolean
    hasError: boolean
    error: unknown | null
  }
  checks: Check[]
}

interface Actions {
  getChecks: () => Promise<void>
  addAnswer: (check: Check, answer: Answer) => void
  isValid: () => boolean
  reset: () => void
}

export type Store = State & Actions

type SetState<T> = StoreApi<T>['setState']
type GetState<T> = StoreApi<T>['getState']

const initialState = {
  meta: {
    isLoading: true,
    hasError: false,
    error: null,
  },
  checks: [],
}

const createActions = (set: SetState<Store>, get: GetState<Store>) =>
  ({
    getChecks: async () => {
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

    reset: () => {
      set(initialState)
    },
  } as Actions)

const withImmer = immer<Store>((set, get) => ({
  ...initialState,
  ...createActions(set, get),
}))

const useStore = create(withImmer)

export { useStore }
