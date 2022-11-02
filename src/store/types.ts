import { type Validation } from '@api'

export interface Check extends Validation {
  inactive: boolean
  answer: keyof AnswerOption
}

export type AnswerOption = typeof ANSWER_OPTIONS

export type Answer = keyof AnswerOption

export const ANSWER_OPTIONS = {
  YES: 'YES',
  NO: 'NO',
  UNANSWERED: 'UNANSWERED',
} as const
