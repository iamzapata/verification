import { render } from '@testing-library/react'
import { ButtonGroup } from './index'

describe('<ButtonGroup />', () => {
  it('renders children', () => {
    expect(() => render(<ButtonGroup />)).not.toThrow()
  })
})
