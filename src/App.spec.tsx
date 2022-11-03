/* eslint-disable @typescript-eslint/await-thenable */
import { render, renderHook, waitFor, act } from '@testing-library/react'
import App from './App'
import * as API from '@api'
import { mockChecks } from './__testing__/mockData'
import { type Store, useStore } from '@store'

vi.spyOn(API, 'fetchChecks').mockImplementation(() =>
  Promise.resolve(mockChecks)
)

let store: Store
describe('<App />', () => {
  beforeEach(() => {
    if (store) {
      store.reset()
    }
    store = renderHook(() => useStore()).result.current
  })
  it('should render', () => {
    expect(async () => {
      await act(() => {
        render(<App />)
      })
    }).not.toThrow()
  })

  it('should call "getChecks" data on render', async () => {
    vi.spyOn(store, 'getChecks')

    await act(() => {
      render(<App />)
    })

    await waitFor(() => {
      expect(store.getChecks).toHaveBeenCalledTimes(1)
    })
  })
})
