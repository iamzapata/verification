import { render, renderHook, act } from '@testing-library/react'
import { ButtonGroup } from './index'
import { type Store, useStore } from '@store'
import { mockChecks, renderWithUserEvent } from '@testing'

const check = mockChecks[0]

let getState: () => Store
describe('<ButtonGroup />', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    if (getState) {
      getState().reset()
    }
    const { result } = renderHook(() => useStore())
    getState = () => result.current
  })

  it('renders children', () => {
    expect(() => render(<ButtonGroup check={check} inactive />)).not.toThrow()
  })

  it('should have a "className" set', () => {
    const { container } = render(<ButtonGroup check={check} inactive />)
    expect(container.firstChild).toHaveClass('ButtonGroup')
  })

  it('should have a "Yes" button and call "addAnswer" when clicked', async () => {
    vi.spyOn(getState(), 'addAnswer')

    const { user, getByText } = renderWithUserEvent(
      <ButtonGroup check={check} inactive />
    )

    const button = getByText(/yes/i)

    await user.click(button)

    expect(getState().addAnswer).toHaveBeenCalledTimes(1)
    expect(getState().addAnswer).toHaveBeenCalledWith(check, 'YES')
  })

  it('should have a "No" button and call "addAnswer" when clicked', async () => {
    vi.spyOn(getState(), 'addAnswer')

    const { user, getByText } = renderWithUserEvent(
      <ButtonGroup check={check} inactive />
    )

    const button = getByText(/no/i)

    await user.click(button)

    expect(getState().addAnswer).toHaveBeenCalledTimes(1)
    expect(getState().addAnswer).toHaveBeenCalledWith(check, 'NO')
  })

  it('should not call "addAnswer" when "1" or "2" is pressed and is inactive', async () => {
    vi.spyOn(getState(), 'addAnswer')

    const { user } = renderWithUserEvent(<ButtonGroup check={check} inactive />)

    await user.keyboard('{1}')

    expect(getState().addAnswer).not.toHaveBeenCalled()

    await user.keyboard('{1}')

    expect(getState().addAnswer).not.toHaveBeenCalled()
  })

  it('should not call "addAnswer" when "1" or "2" is pressed and is NOT selected', async () => {
    vi.spyOn(getState(), 'addAnswer')

    const { user } = renderWithUserEvent(
      <ButtonGroup check={check} inactive={false} />
    )

    await user.keyboard('{1}')

    expect(getState().addAnswer).not.toHaveBeenCalled()

    await user.keyboard('{1}')

    expect(getState().addAnswer).not.toHaveBeenCalled()
  })

  it('should call "addAnswer" with "YES" when "1" is pressed', async () => {
    vi.spyOn(getState(), 'addAnswer')

    const { setSelected } = getState()

    act(() => {
      setSelected(check)
    })

    const { user } = renderWithUserEvent(
      <ButtonGroup check={check} inactive={false} />
    )

    await user.keyboard('{1}')

    expect(getState().addAnswer).toHaveBeenCalledTimes(1)
    expect(getState().addAnswer).toHaveBeenCalledWith(check, 'YES')
  })

  it('should call "addAnswer" with "NO" when "2" is pressed', async () => {
    vi.spyOn(getState(), 'addAnswer')

    const { setSelected } = getState()

    act(() => {
      setSelected(check)
    })

    const { user } = renderWithUserEvent(
      <ButtonGroup check={check} inactive={false} />
    )

    await user.keyboard('{2}')

    expect(getState().addAnswer).toHaveBeenCalledTimes(1)
    expect(getState().addAnswer).toHaveBeenCalledWith(check, 'NO')
  })
})
