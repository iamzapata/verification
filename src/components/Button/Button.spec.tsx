import { render } from '@testing-library/react'
import { renderWithUserEvent } from '../../__testing__/utils'
import { Button } from './index'

describe('<Button />', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Button>
        <>Foo</>
      </Button>
    )
    const button = getByText(/foo/i)
    expect(button).toBeInTheDocument()
  })

  it('should take a "disabled" prop', () => {
    const { getByText, rerender } = render(
      <Button>
        <>Foo</>
      </Button>
    )
    const button = getByText(/foo/i)

    expect(button).not.toBeDisabled()

    rerender(
      <Button disabled>
        <>Foo</>
      </Button>
    )

    expect(button).toBeDisabled()
  })

  it('should take an "selected" prop', () => {
    const { getByText, rerender } = render(
      <Button selected>
        <>Foo</>
      </Button>
    )
    const button = getByText(/foo/i)

    expect(button).toHaveClass('isSelected')
    expect(button).not.toHaveClass('isUnselected')

    rerender(
      <Button>
        <>Foo</>
      </Button>
    )

    expect(button).not.toHaveClass('isSelected')
    expect(button).toHaveClass('isUnselected')
  })

  it('should take an "inactive" prop', () => {
    const { getByText } = render(
      <Button inactive>
        <>Foo</>
      </Button>
    )
    const button = getByText(/foo/i)

    expect(button).toHaveClass('isInactive')
  })

  it('should take a "start" prop', () => {
    const { getByText } = render(
      <Button start>
        <>Foo</>
      </Button>
    )
    const button = getByText(/foo/i)

    expect(button).toHaveClass('isStart')
  })

  it('should take an "end" prop', () => {
    const { getByText } = render(
      <Button end>
        <>Foo</>
      </Button>
    )
    const button = getByText(/foo/i)

    expect(button).toHaveClass('isEnd')
  })

  it('should take a "type" prop', () => {
    const { getByText, rerender } = render(
      <Button>
        <>Foo</>
      </Button>
    )
    const button = getByText(/foo/i)

    expect(button).toHaveAttribute('type', 'button')

    rerender(
      <Button type="submit">
        <>Foo</>
      </Button>
    )

    expect(button).toHaveAttribute('type', 'submit')
  })

  it('should handle "onClick" event', async () => {
    const onClickMock = vi.fn()

    const { user, getByText } = renderWithUserEvent(
      <Button onClick={onClickMock}>
        <>Foo</>
      </Button>
    )

    const button = getByText(/foo/i)

    await user.click(button)

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('should not handle "onClick" event when "disabled"', async () => {
    const onClickMock = vi.fn()

    const { user, getByText } = renderWithUserEvent(
      <Button onClick={onClickMock} disabled>
        <>Foo</>
      </Button>
    )

    const button = getByText(/foo/i)

    await user.click(button)

    expect(onClickMock).not.toHaveBeenCalledTimes(1)
  })
})
