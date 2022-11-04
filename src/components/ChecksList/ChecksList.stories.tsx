import type { StoryFn, Meta } from '@storybook/react'

import { ChecksList } from './ChecksList.component'
import { mockChecks } from '@testing'

const firstcheck = mockChecks[0]
firstcheck.inactive = false
const checks = [firstcheck, ...mockChecks.slice(1)]

export default {
  title: 'Components/ChecksList',
  component: ChecksList,
  argTypes: {},
} as Meta<typeof ChecksList>

const Template: StoryFn<typeof ChecksList> = args => <ChecksList {...args} />

export const Default = Template.bind({})
Default.args = {
  checks,
}
