import type { Check } from '@store'

export const mockChecks: Check[] = [
  {
    id: 'aaa',
    priority: 10,
    description: 'Face on the picture matches face on the document',
    inactive: true,
    answer: 'UNANSWERED',
  },
  {
    id: 'bbb',
    priority: 5,
    description: 'Veriff supports presented document',
    inactive: true,
    answer: 'UNANSWERED',
  },
  {
    id: 'ccc',
    priority: 7,
    description: 'Face is clearly visible',
    inactive: true,
    answer: 'UNANSWERED',
  },
  {
    id: 'ddd',
    priority: 3,
    description: 'Document data is clearly visible',
    inactive: true,
    answer: 'UNANSWERED',
  },
]
