import { render } from '@testing-library/react'
import { ChecksList } from './ChecksList.component'
import { mockChecks } from '@testing'

describe('<ChecksList />', () => {
  it('renders', () => {
    expect(() => render(<ChecksList checks={[]} />)).not.toThrow()
  })

  it('should have a "className" set', () => {
    const { container } = render(<ChecksList checks={[]} />)
    expect(container.firstChild).toHaveClass('ChecksList')
  })

  it('it should render checks using the <CheckItem> component', () => {
    const { container } = render(<ChecksList checks={mockChecks} />)
    const children = container?.firstChild?.childNodes ?? []

    expect(children?.length).toEqual(4)

    Array.from(children).forEach(child =>
      expect(child).toHaveClass('CheckItem')
    )
  })
})
