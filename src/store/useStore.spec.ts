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
    expect(getState()).toMatchInlineSnapshot(`
      {
        "addAnswer": [Function],
        "checks": [],
        "getChecks": [Function],
        "isValid": [Function],
        "meta": {
          "error": null,
          "hasError": false,
          "isLoading": true,
        },
        "reset": [Function],
        "resultsSubmitted": false,
        "selectedCheck": null,
        "sendResults": [Function],
        "setSelected": [Function],
      }
    `)
  })

  describe('getChecks', () => {
    it('can getChecks checks', async () => {
      const { getChecks } = getState()

      await act(() => {
        return getChecks()
      })

      const { checks } = getState()

      expect(checks.length).toEqual(3)
    })

    it('sorts checks by priority', async () => {
      const { getChecks } = getState()

      await act(() => {
        return getChecks()
      })

      const { checks } = getState()

      expect(checks[0]?.id).toEqual('bbb')
      expect(checks[1]?.id).toEqual('ccc')
      expect(checks[2]?.id).toEqual('aaa')
    })

    it('sets "answer" and "inactive" properties', async () => {
      const { getChecks } = getState()

      await act(() => {
        return getChecks()
      })

      const { checks } = getState()

      const [first, ...rest] = checks

      expect(first).toMatchObject({ inactive: false, answer: 'UNANSWERED' })
      rest.forEach(check =>
        expect(check).toMatchObject({ inactive: true, answer: 'UNANSWERED' })
      )
    })

    it('sets isLoading state correctly', async () => {
      const { getChecks } = getState()
      let isLoading = getState().meta.isLoading

      expect(isLoading).toEqual(true)

      await act(() => {
        return getChecks()
      })

      isLoading = getState().meta.isLoading

      expect(isLoading).toEqual(false)
    })
  })

  describe('submitCheckResults', () => {
    it('can getChecks checks', async () => {
      const { sendResults, getChecks } = getState()

      vi.spyOn(API, 'submitCheckResults').mockImplementationOnce(() =>
        Promise.resolve(mockChecks())
      )

      vi.spyOn(API, 'fetchChecks').mockImplementationOnce(() =>
        Promise.resolve(mockChecks())
      )

      await act(() => {
        return getChecks()
      })

      await act(() => {
        return sendResults()
      })

      const { resultsSubmitted } = getState()

      expect(resultsSubmitted).toEqual(true)
      expect(API.submitCheckResults).toHaveBeenCalledWith([
        {
          checkId: 'bbb',
          value: 'UNANSWERED',
        },
        {
          checkId: 'ccc',
          value: 'UNANSWERED',
        },
        {
          checkId: 'aaa',
          value: 'UNANSWERED',
        },
      ])
    })
  })

  describe('setSelected', () => {
    it('can set selected check', async () => {
      const { setSelected, getChecks } = getState()

      const selectedMock: Check = {
        id: 'zzz',
        priority: 1,
        description: 'test',
        answer: 'YES',
        inactive: false,
      }

      await act(() => {
        return getChecks()
      })

      act(() => {
        return setSelected(selectedMock)
      })

      const { selectedCheck } = getState()

      expect(selectedCheck).toEqual(selectedMock)
    })
  })

  describe('addAnswer', () => {
    it('returns early when no checks present in state', () => {
      const { addAnswer } = getState()

      // @ts-expect-error: Expected 2 arguments, but got 0.
      expect(addAnswer()).toEqual(undefined)
    })

    it('throws if invoked missing first argument', async () => {
      const { addAnswer, getChecks } = getState()

      await act(() => {
        return getChecks()
      })

      // @ts-expect-error: Expected 2 arguments, but got 0.
      expect(() => addAnswer()).toThrowError('Missing "checkAnswered" argument')
    })

    it('throws if invoked missing second argument', async () => {
      const { addAnswer, getChecks } = getState()

      await act(() => {
        return getChecks()
      })

      const { checks } = getState()

      // @ts-expect-error: Expected 2 arguments, but got 0.
      expect(() => addAnswer(checks[0])).toThrowError(
        'Missing "answer" argument'
      )
    })

    it('adds answer to a check and marks next item as "active"', async () => {
      const { addAnswer, getChecks } = getState()

      await act(() => {
        return getChecks()
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

    it('marks following checks as "inactive" and "UNANSWERED" if current answer is "NO"', async () => {
      const { addAnswer, getChecks } = getState()

      await act(() => {
        return getChecks()
      })

      let checks = getState().checks

      act(() => addAnswer(checks[0], 'YES'))
      act(() => addAnswer(checks[1], 'YES'))
      act(() => addAnswer(checks[2], 'YES'))

      checks = getState().checks

      act(() => addAnswer(checks[0], 'NO'))

      checks = getState().checks
      const [first, second, third] = checks
      expect(first.answer).toEqual('NO')
      expect(second).toMatchObject({ inactive: true, answer: 'UNANSWERED' })
      expect(third).toMatchObject({ inactive: true, answer: 'UNANSWERED' })
    })

    it('marks answered check as selected', async () => {
      const { getChecks, addAnswer } = getState()

      await act(() => {
        return getChecks()
      })

      const { checks } = getState()

      act(() => addAnswer(checks[1], 'YES'))

      const { selectedCheck } = getState()
      expect(selectedCheck?.id).toEqual(checks[1].id)
    })

    it('preserves checks order after update', async () => {
      const { getChecks, addAnswer } = getState()

      await act(() => {
        return getChecks()
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
      const { isValid, getChecks } = getState()

      await act(() => {
        return getChecks()
      })

      expect(isValid()).toEqual(false)
    })

    it('returns "true" if at least one answer is "NO"', async () => {
      const { isValid, addAnswer, getChecks } = getState()

      await act(() => {
        return getChecks()
      })

      const { checks } = getState()

      act(() => addAnswer(checks[0], 'NO'))

      expect(isValid()).toEqual(true)
    })

    it('returns "true" all answers are "YES"', async () => {
      const { isValid, addAnswer, getChecks } = getState()

      await act(() => {
        return getChecks()
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
      const { reset, getChecks } = getState()

      await act(() => {
        return getChecks()
      })

      expect(getState().checks.length).toEqual(3)

      act(() => reset())

      expect(getState()).toMatchObject({
        checks: [],
      })
    })
  })
})
