import { render } from '@testing-library/react'
import { Submit } from './Submit.component'

describe('<Submit />', () => {
  it('renders', () => {
    expect(() => render(<Submit className="submit" disabled />)).not.toThrow()
  })

  it('takes "className" prop', () => {
    const { getByText } = render(<Submit className="CustomSubmit" disabled />)
    const submit = getByText(/submit/i)
    expect(submit).toHaveClass('CustomSubmit')
  })

  it('should be a button', () => {
    const { getByText } = render(<Submit className="CustomSubmit" disabled />)
    const submit = getByText(/submit/i)
    expect(submit).toBeInstanceOf(HTMLButtonElement)
  })
})
