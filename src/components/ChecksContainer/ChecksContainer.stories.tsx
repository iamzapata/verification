import type { StoryFn, Meta } from '@storybook/react'

import { ChecksContainer } from './ChecksContainer.component'
import { mockChecks } from '@testing'

const getNthCheck = (n: number) => ({ ...mockChecks[n] })
let firstCheck = getNthCheck(0)
firstCheck.inactive = false
const checks = [firstCheck, ...mockChecks.slice(1)]

export default {
  title: 'Components/ChecksContainer',
  component: ChecksContainer,
  argTypes: {},
} as Meta<typeof ChecksContainer>

const Template: StoryFn<typeof ChecksContainer> = args => (
  <ChecksContainer {...args} />
)

export const IsLoading = Template.bind({})
IsLoading.args = {
  isLoading: true,
}

export const HasError = Template.bind({})
HasError.args = {
  hasError: true,
}

export const Unanswered = Template.bind({})
Unanswered.args = {
  checks,
  isValid: false,
}

firstCheck = getNthCheck(0)
firstCheck.answer = 'NO'
export const Answered = Template.bind({})
Answered.args = {
  checks: [firstCheck, ...mockChecks.slice(1)],
  isValid: true,
}
