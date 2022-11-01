import { render } from '@testing-library/react'
import { ChecksList } from './ChecksList.component'
import type { Check } from '@api'

const checks: Check[] = [
  {
    id: 'aaa',
    priority: 10,
    description: 'Face on the picture matches face on the document',
  },
  {
    id: 'bbb',
    priority: 5,
    description: 'Veriff supports presented document',
  },
  {
    id: 'ccc',
    priority: 7,
    description: 'Face is clearly visible',
  },
  {
    id: 'ddd',
    priority: 1,
    description: 'Document data is clearly visible',
  },
]

describe('<ChecksList />', () => {
  it('renders', () => {
    expect(() => render(<ChecksList checks={[]} />)).not.toThrow()
  })

  it('displays checks in order of "priority"', () => {
    const { container, getByText } = render(<ChecksList checks={checks} />)

    const children = Array.from(container.firstChild?.childNodes)

    const first = getByText('Document data is clearly visible')
    expect(children.indexOf(first)).toBe(0)

    const second = getByText('Veriff supports presented document')
    expect(children.indexOf(second)).toBe(1)

    const third = getByText('Face is clearly visible')
    expect(children.indexOf(third)).toBe(2)

    const fourth = getByText('Face on the picture matches face on the document')
    expect(children.indexOf(fourth)).toBe(3)
  })
})
