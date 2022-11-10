import { render, renderHook, act } from '@testing-library/react'
import { renderWithUserEvent } from '@testing'
import { ChecksList } from './ChecksList.component'
import { mockChecks } from '@testing'
import { type Store, useStore } from '@store'

const checks = mockChecks

let getState: () => Store
describe('<ChecksList />', () => {
  beforeEach(() => {
    if (getState) {
      getState().reset()
    }
    const { result } = renderHook(() => useStore())
    getState = () => result.current
  })

  it('renders', () => {
    expect(() => render(<ChecksList checks={[]} />)).not.toThrow()
  })

  it('should have a "className" set', () => {
    const { container } = render(<ChecksList checks={[]} />)
    expect(container.firstChild).toHaveClass('ChecksList')
  })

  it('it should render checks using the <CheckItem> component', () => {
    const { container } = render(<ChecksList checks={checks} />)
    const children = container?.firstChild?.childNodes ?? []

    expect(children?.length).toEqual(4)

    Array.from(children).forEach(child =>
      expect(child).toHaveClass('CheckItem')
    )
  })

  it('should call "setSelected" with next check when "ArrowDown" is triggered', async () => {
    vi.spyOn(getState(), 'setSelected')

    const { addAnswer, getChecks } = getState()

    await act(() => {
      return getChecks()
    })

    const { checks } = getState()

    act(() => addAnswer(checks[0], 'YES'))

    const { user } = renderWithUserEvent(<ChecksList checks={checks} />)

    await act(() => user.keyboard('{ArrowDown}'))

    const { setSelected, selectedCheck } = getState()

    expect(setSelected).toHaveBeenCalledTimes(1)
    expect(setSelected).toHaveBeenCalledWith(checks[1])
    expect(selectedCheck).toEqual(checks[1])
  })

  it('should call "setSelected" with previous check when "ArrowUp" is triggered', async () => {
    vi.spyOn(getState(), 'setSelected')

    const { addAnswer, getChecks } = getState()

    await act(() => {
      return getChecks()
    })

    const { checks } = getState()

    const { user } = renderWithUserEvent(<ChecksList checks={checks} />)

    let selectedCheck
    act(() => addAnswer(checks[0], 'YES'))
    await act(() => user.keyboard('{ArrowDown}'))
    selectedCheck = getState().selectedCheck
    expect(selectedCheck).toEqual(checks[1])
    await act(() => user.keyboard('{ArrowUp}'))
    selectedCheck = getState().selectedCheck
    expect(selectedCheck).toEqual(checks[0])
  })
})
