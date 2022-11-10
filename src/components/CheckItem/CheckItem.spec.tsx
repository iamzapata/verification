import { render } from '@testing-library/react'
import type { Check } from '@store'
import { CheckItem } from './index'
import { mockChecks } from '@testing'

const check: Check = {
  ...mockChecks[0],
  description: 'Verify mock question',
}

vi.mock('../ButtonGroup', () => ({
  ButtonGroup: () => 'ButtonGroupMock',
}))

describe('<CheckItem />', () => {
  it('renders', () => {
    expect(() =>
      render(<CheckItem check={check} selected={false} />)
    ).not.toThrow()
  })

  it('should set the correct className', () => {
    const { container, rerender } = render(
      <CheckItem check={check} selected={false} />
    )
    expect(container.firstChild).toHaveClass('CheckItem isInactive')

    rerender(
      <CheckItem check={{ ...check, inactive: false }} selected={false} />
    )
    expect(container.firstChild).toHaveClass('CheckItem')
  })

  it('renders description and <ButtonGroup />', () => {
    const { getByText } = render(<CheckItem check={check} selected={false} />)

    const description = getByText(/Verify mock question/i)
    expect(description).toBeInTheDocument()

    const buttonGroup = getByText(/ButtonGroupMock/i)
    expect(buttonGroup).toBeInTheDocument()
  })
})
