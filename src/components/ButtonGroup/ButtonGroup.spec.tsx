import { render, renderHook, waitFor } from '@testing-library/react'
import { ButtonGroup } from './index'
import { type Store, useStore } from '@store'
import { mockChecks, renderWithUserEvent } from '@testing'

const check = mockChecks[0]

let store: Store
describe('<ButtonGroup />', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    if (store) {
      store.reset()
    }
    store = renderHook(() => useStore()).result.current
  })
  it('renders children', () => {
    expect(() => render(<ButtonGroup check={check} inactive />)).not.toThrow()
  })

  it('should have a "className" set', () => {
    const { container } = render(<ButtonGroup check={check} inactive />)
    expect(container.firstChild).toHaveClass('ButtonGroup')
  })

  it('should have an "Yes" button and call "addAnswer" when clicked', async () => {
    vi.spyOn(store, 'addAnswer')

    const { user, getByText } = renderWithUserEvent(
      <ButtonGroup check={check} inactive />
    )

    const button = getByText(/yes/i)

    await user.click(button)

    await waitFor(() => {
      expect(store.addAnswer).toHaveBeenCalledTimes(1)
      expect(store.addAnswer).toHaveBeenCalledWith(check, 'YES')
    })
  })

  it('should have an "No" button and call "addAnswer" when clicked', async () => {
    vi.spyOn(store, 'addAnswer')

    const { user, getByText } = renderWithUserEvent(
      <ButtonGroup check={check} inactive />
    )

    const button = getByText(/no/i)

    await user.click(button)

    await waitFor(() => {
      expect(store.addAnswer).toHaveBeenCalledTimes(1)
      expect(store.addAnswer).toHaveBeenCalledWith(check, 'NO')
    })
  })
})
