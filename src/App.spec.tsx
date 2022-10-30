import { render } from '@testing-library/react'
import App from './App'

describe('<App />', () => {
  it('should render', () => {
    expect(() => render(<App />)).not.toThrow()
  })

  it('should match snapshot', () => {
    const { container } = render(<App />)
    expect(container).toMatchSnapshot()
  })
})
