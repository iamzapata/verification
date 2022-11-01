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
