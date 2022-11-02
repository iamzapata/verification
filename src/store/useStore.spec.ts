import { useStore } from './useStore'
import { renderHook, act } from '@testing-library/react'
import type { Check, Store } from '@store'
import * as API from '@api'

const mockChecks: () => Check[] = () => [
  {
    id: 'aaa',
    priority: 10,
    description: 'Nec dubitamus multa iter quae et nos invenerat.',
    answer: 'NO',
    inactive: false,
  },
  {
    id: 'bbb',
    priority: 2,
    description: 'Ullamco laboris nisi ut aliquid ex ea commodi consequat.',
    answer: 'NO',
    inactive: false,
  },
  {
    id: 'ccc',
    priority: 7,
    description: 'Laboris nisi ut aliquid ex ea commodi consequat.',
    answer: 'NO',
    inactive: false,
  },
]

vi.spyOn(API, 'fetchChecks').mockImplementation(() =>
  Promise.resolve(mockChecks())
)

let getState: () => Store
describe('useStore', () => {
  beforeEach(() => {
    if (getState) {
      getState().reset()
    }
    const { result } = renderHook(() => useStore())
    getState = () => result.current
  })

  it('initializes state', () => {
    const { checks, meta } = getState()
    expect(checks).toEqual([])
    expect(meta).toEqual({
      error: null,
      hasError: false,
      isLoading: true,
    })
  })

  describe('fetch', () => {
    it('can fetch checks', async () => {
      const { fetch } = getState()

      await act(() => {
        return fetch()
      })

      const { checks } = getState()

      expect(checks.length).toEqual(3)
    })

    it('sorts checks by priority', async () => {
      const { fetch } = getState()

      await act(() => {
        return fetch()
      })

      const { checks } = getState()

      expect(checks[0]?.id).toEqual('bbb')
      expect(checks[1]?.id).toEqual('ccc')
      expect(checks[2]?.id).toEqual('aaa')
    })

    it('sets "answer" and "inactive" properties', async () => {
      const { fetch } = getState()

      await act(() => {
        return fetch()
      })

      const { checks } = getState()

      const [first, ...rest] = checks

      expect(first).toMatchObject({ inactive: false, answer: 'UNANSWERED' })
      rest.forEach(check =>
        expect(check).toMatchObject({ inactive: true, answer: 'UNANSWERED' })
      )
    })

    it('sets isLoading state correctly', async () => {
      const { fetch } = getState()
      let isLoading = getState().meta.isLoading

      expect(isLoading).toEqual(true)

      await act(() => {
        return fetch()
      })

      isLoading = getState().meta.isLoading

      expect(isLoading).toEqual(false)
    })
  })

  describe('addAnswer', () => {
    it('returns early when no checks present in state', () => {
      const { addAnswer } = getState()

      // @ts-expect-error: Expected 2 arguments, but got 0.
      expect(addAnswer()).toEqual(undefined)
    })

    it('throws if invoked missing first argument', async () => {
      const { addAnswer, fetch } = getState()

      await act(() => {
        return fetch()
      })

      // @ts-expect-error: Expected 2 arguments, but got 0.
      expect(() => addAnswer()).toThrowError('Missing "checkAnswered" argument')
    })

    it('throws if invoked missing second argument', async () => {
      const { addAnswer, fetch } = getState()

      await act(() => {
        return fetch()
      })

      const { checks } = getState()

      // @ts-expect-error: Expected 2 arguments, but got 0.
      expect(() => addAnswer(checks[0])).toThrowError(
        'Missing "answer" argument'
      )
    })

    it('adds answer to a check and marks next item as "active"', async () => {
      const { addAnswer, fetch } = getState()

      await act(() => {
        return fetch()
      })

      let checks = getState().checks
      const [firstCheck] = checks

      act(() => addAnswer(firstCheck, 'YES'))

      checks = getState().checks

      // updatedCheck will not be undefined
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const updatedCheck = checks.find(check => check.id === firstCheck.id)!
      const currentIndex = checks.findIndex(i => i.id === updatedCheck.id)
      const nextItem = checks[currentIndex + 1]

      expect(updatedCheck.answer).toEqual('YES')
      expect(nextItem.inactive).toEqual(false)
    })

    it('preserves checks order after update', async () => {
      const { fetch, addAnswer } = getState()

      await act(() => {
        return fetch()
      })

      const { checks } = getState()

      act(() => addAnswer(checks[0], 'NO'))

      expect(checks[0]?.id).toEqual('bbb')
      expect(checks[1]?.id).toEqual('ccc')
      expect(checks[2]?.id).toEqual('aaa')
    })
  })

  describe('isValid', () => {
    it('returns "false" by default', () => {
      const { isValid } = getState()

      expect(isValid()).toEqual(false)
    })

    it('returns "false" if checks are not answered', async () => {
      const { isValid, fetch } = getState()

      await act(() => {
        return fetch()
      })

      expect(isValid()).toEqual(false)
    })

    it('returns "true" if at least one answer is "NO"', async () => {
      const { isValid, addAnswer, fetch } = getState()

      await act(() => {
        return fetch()
      })

      const { checks } = getState()

      act(() => addAnswer(checks[0], 'NO'))

      expect(isValid()).toEqual(true)
    })

    it('returns "true" all answers are "YES"', async () => {
      const { isValid, addAnswer, fetch } = getState()

      await act(() => {
        return fetch()
      })

      const { checks } = getState()
      const [first, second, third] = checks

      act(() => {
        addAnswer(first, 'YES')
        addAnswer(second, 'YES')
        addAnswer(third, 'YES')
      })

      expect(isValid()).toEqual(true)
    })
  })

  describe('reset', () => {
    it('resets store state', async () => {
      const { reset, fetch } = getState()

      await act(() => {
        return fetch()
      })

      expect(getState().checks.length).toEqual(3)

      act(() => reset())

      expect(getState()).toMatchObject({
        checks: [],
      })
    })
  })
})
