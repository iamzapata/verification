import type { StoryFn, Meta } from '@storybook/react'

import { ChecksList } from './ChecksList.component'
import { checks } from '@testing'

export default {
  title: 'Components/ChecksList',
  component: ChecksList,
  argTypes: {},
} as Meta<typeof ChecksList>

const Template: StoryFn<typeof ChecksList> = (args) => <ChecksList {...args} />

export const Default = Template.bind({})
Default.args = {
  checks,
}

export const Inactive = Template.bind({})
Inactive.args = {
  checks,
}
