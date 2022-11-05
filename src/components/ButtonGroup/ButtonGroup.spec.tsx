import { render, renderHook, act } from '@testing-library/react'
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

  it('should have a "Yes" button and call "addAnswer" when clicked', async () => {
    vi.spyOn(store, 'addAnswer')

    const { user, getByText } = renderWithUserEvent(
      <ButtonGroup check={check} inactive />
    )

    const button = getByText(/yes/i)

    await user.click(button)

    expect(store.addAnswer).toHaveBeenCalledTimes(1)
    expect(store.addAnswer).toHaveBeenCalledWith(check, 'YES')
  })

  it('should have a "No" button and call "addAnswer" when clicked', async () => {
    vi.spyOn(store, 'addAnswer')

    const { user, getByText } = renderWithUserEvent(
      <ButtonGroup check={check} inactive />
    )

    const button = getByText(/no/i)

    await user.click(button)

    expect(store.addAnswer).toHaveBeenCalledTimes(1)
    expect(store.addAnswer).toHaveBeenCalledWith(check, 'NO')
  })

  it('should not call "addAnswer" when "1" or "2" is pressed and is inactive', async () => {
    vi.spyOn(store, 'addAnswer')

    const { user } = renderWithUserEvent(<ButtonGroup check={check} inactive />)

    await user.keyboard('{1}')

    expect(store.addAnswer).not.toHaveBeenCalled()

    await user.keyboard('{1}')

    expect(store.addAnswer).not.toHaveBeenCalled()
  })

  it('should not call "addAnswer" when "1" or "2" is pressed and is NOT selected', async () => {
    vi.spyOn(store, 'addAnswer')

    const { user } = renderWithUserEvent(
      <ButtonGroup check={check} inactive={false} />
    )

    await user.keyboard('{1}')

    expect(store.addAnswer).not.toHaveBeenCalled()

    await user.keyboard('{1}')

    expect(store.addAnswer).not.toHaveBeenCalled()
  })

  it('should call "addAnswer" with "YES" when "1" is pressed', async () => {
    vi.spyOn(store, 'addAnswer')

    const { setSelected } = store

    act(() => {
      setSelected(check)
    })

    const { user } = renderWithUserEvent(
      <ButtonGroup check={check} inactive={false} />
    )

    await user.keyboard('{1}')

    expect(store.addAnswer).toHaveBeenCalledTimes(1)
    expect(store.addAnswer).toHaveBeenCalledWith(check, 'YES')
  })

  it('should call "addAnswer" with "NO" when "2" is pressed', async () => {
    vi.spyOn(store, 'addAnswer')

    const { setSelected } = store

    act(() => {
      setSelected(check)
    })

    const { user } = renderWithUserEvent(
      <ButtonGroup check={check} inactive={false} />
    )

    await user.keyboard('{2}')

    expect(store.addAnswer).toHaveBeenCalledTimes(1)
    expect(store.addAnswer).toHaveBeenCalledWith(check, 'NO')
  })
})
