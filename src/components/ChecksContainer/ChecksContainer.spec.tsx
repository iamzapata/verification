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

vi.mock('../ResultsSubmitted', () => ({
  ResultsSubmitted: () => 'ResultsSubmittedMock',
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
          resultsSubmitted={false}
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
        resultsSubmitted={false}
      />
    )
    expect(container.firstChild).toHaveClass('ChecksContainer')
  })

  it('should render a <ResultsSubmitted /> component', () => {
    const { getByText } = render(
      <ChecksContainer
        checks={[]}
        isLoading={false}
        hasError={false}
        isValid={true}
        resultsSubmitted={true}
      />
    )

    const spinner = getByText(/ResultsSubmittedMock/i)
    expect(spinner).toBeInTheDocument()
  })

  it('should render a <LoadingSpinner /> component', () => {
    const { getByText } = render(
      <ChecksContainer
        checks={[]}
        isLoading={true}
        hasError={false}
        isValid={true}
        resultsSubmitted={false}
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
        resultsSubmitted={false}
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
        resultsSubmitted={false}
      />
    )

    const submit = getByText(/SubmitMock/i)
    expect(submit).toBeInTheDocument()

    const checksList = getByText(/ChecksListMock/i)
    expect(checksList).toBeInTheDocument()
  })
})
