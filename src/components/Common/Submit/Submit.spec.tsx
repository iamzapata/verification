import { render, renderHook } from '@testing-library/react'
import { Submit } from './Submit.component'
import { renderWithUserEvent } from '@testing'
import { type Store, useStore } from '@store'
import { act } from 'react-dom/test-utils'

let store: Store
describe('<Submit />', () => {
  beforeEach(() => {
    if (store) {
      store.reset()
    }
    store = renderHook(() => useStore()).result.current
  })
  it('renders', () => {
    expect(() => render(<Submit disabled />)).not.toThrow()
  })

  it('takes "className" prop', () => {
    const { getByText } = render(<Submit className="CustomSubmit" disabled />)
    const submit = getByText(/submit/i)
    expect(submit).toHaveClass('CustomSubmit')
  })

  it('should be a button', () => {
    const { getByText } = render(<Submit disabled />)
    const submit = getByText(/submit/i)
    expect(submit).toBeInstanceOf(HTMLButtonElement)
  })

  it('calls sendResults when it is not disabled', async () => {
    vi.spyOn(store, 'sendResults')

    const { user, getByText } = renderWithUserEvent(<Submit disabled={false} />)
    const submit = getByText(/submit/i)

    await user.click(submit)

    expect(store.sendResults).toHaveBeenCalledTimes(1)
  })

  it('does not call sendResults when it is disabled', async () => {
    vi.spyOn(store, 'sendResults')

    const { user, getByText } = renderWithUserEvent(<Submit disabled />)
    const submit = getByText(/submit/i)

    await user.click(submit)

    expect(store.sendResults).not.toHaveBeenCalled()
  })
})
