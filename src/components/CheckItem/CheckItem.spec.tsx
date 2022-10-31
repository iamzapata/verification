import { render } from '@testing-library/react'
import { CheckItem } from './index'

describe('<CheckItem />', () => {
  it('renders', () => {
    expect(() =>
      render(
        <CheckItem check={{ id: 'xyz', priority: 1, description: 'abc' }} />
      )
    ).not.toThrow()
  })
})
