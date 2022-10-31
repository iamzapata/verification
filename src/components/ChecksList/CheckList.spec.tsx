import { render } from '@testing-library/react'
import { ChecksList } from './ChecksList.component'

describe('<ChecksList />', () => {
  it('renders', () => {
    expect(() => render(<ChecksList checks={[]} />)).not.toThrow()
  })
})
