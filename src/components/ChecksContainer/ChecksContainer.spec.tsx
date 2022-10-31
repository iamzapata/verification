import { render } from '@testing-library/react'
import { ChecksContainer } from './ChecksContainer.component'

describe('<ChecksContainer />', () => {
  it('renders', () => {
    expect(() => render(<ChecksContainer />)).not.toThrow()
  })
})
