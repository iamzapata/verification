import { render } from '@testing-library/react'
import { ButtonGroup } from './index'
import { mockChecks, renderWithUserEvent } from '@testing'

const check = mockChecks[0]

describe('<ButtonGroup />', () => {
  it('renders children', () => {
    expect(() => render(<ButtonGroup check={check} inactive />)).not.toThrow()
  })

  it('should have a "className" set', () => {
    const { container } = render(<ButtonGroup check={check} inactive />)
    expect(container.firstChild).toHaveClass('ButtonGroup')
  })

  it('should have an "Yes" button', async () => {
    const { user, getByText } = renderWithUserEvent(
      <ButtonGroup check={check} inactive />
    )

    const button = getByText(/yes/i)

    await user.click(button)
  })
})
