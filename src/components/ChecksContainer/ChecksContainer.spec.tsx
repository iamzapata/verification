import { render } from '@testing-library/react'
import { ChecksContainer } from './ChecksContainer.component'

vi.mock('../Common/LoadingSpinner', () => ({
  LoadingSpinner: () => 'LoadingSpinnerMock',
}))

vi.mock('../Common/Error', () => ({
  Error: () => 'ErrorMock',
}))

vi.mock('../Common/Submit', () => ({
  Submit: () => 'SubmitMock',
}))

vi.mock('../ChecksList', () => ({
  ChecksList: () => 'ChecksListMock',
}))

describe('<ChecksContainer />', () => {
  it('renders', () => {
    expect(() =>
      render(
        <ChecksContainer
          checks={[]}
          isLoading={false}
          hasError={false}
          isValid={true}
        />
      )
    ).not.toThrow()
  })

  it('should have a "className" set', () => {
    const { container } = render(
      <ChecksContainer
        checks={[]}
        isLoading={false}
        hasError={false}
        isValid={true}
      />
    )
    expect(container.firstChild).toHaveClass('ChecksContainer')
  })

  it('should render a <LoadingSpinner /> component', () => {
    const { getByText } = render(
      <ChecksContainer
        checks={[]}
        isLoading={true}
        hasError={false}
        isValid={true}
      />
    )

    const spinner = getByText(/LoadingSpinnerMock/i)
    expect(spinner).toBeInTheDocument()
  })

  it('should render an <Error /> component', () => {
    const { getByText } = render(
      <ChecksContainer
        checks={[]}
        isLoading={false}
        hasError={true}
        isValid={true}
      />
    )

    const error = getByText(/ErrorMock/i)
    expect(error).toBeInTheDocument()
  })

  it('should render a <Submit /> component and a <CheckList /> component', () => {
    const { getByText } = render(
      <ChecksContainer
        checks={[]}
        isLoading={false}
        hasError={false}
        isValid={true}
      />
    )

    const submit = getByText(/SubmitMock/i)
    expect(submit).toBeInTheDocument()

    const checksList = getByText(/ChecksListMock/i)
    expect(checksList).toBeInTheDocument()
  })
})
