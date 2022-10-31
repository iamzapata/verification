import { render } from '@testing-library/react'
import { Submit } from './Submit.component'

describe('<Submit />', () => {
  it('renders', () => {
    expect(() => render(<Submit className="submit" />)).not.toThrow()
  })
})
