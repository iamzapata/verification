import type { StoryFn, Meta } from '@storybook/react'

import { CheckItem } from './CheckItem.component'
import { type Check } from '@api'

export default {
  title: 'Components/CheckItem',
  component: CheckItem,
  argTypes: {},
} as Meta<typeof CheckItem>

const check: Check = {
  id: 'aaa',
  priority: 10,
  description: 'Face on the picture matches face on the document',
}

const Template: StoryFn<typeof CheckItem> = (args) => <CheckItem {...args} />

export const Default = Template.bind({})
Default.args = {
  check,
}

export const Inactive = Template.bind({})
Inactive.args = {
  check,
  inactive: true,
}
