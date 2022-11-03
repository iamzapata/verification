import type { StoryFn, Meta } from '@storybook/react'

import { CheckItem } from './CheckItem.component'
import { type Check } from '@store'

export default {
  title: 'Components/CheckItem',
  component: CheckItem,
  argTypes: {},
} as Meta<typeof CheckItem>

const check: Check = {
  id: 'aaa',
  priority: 10,
  description: 'Face on the picture matches face on the document',
  inactive: false,
  answer: 'UNANSWERED',
}

const Template: StoryFn<typeof CheckItem> = args => <CheckItem {...args} />

export const AnsweredYes = Template.bind({})
AnsweredYes.args = {
  check: {
    ...check,
    answer: 'YES',
  },
}

export const AnsweredNo = Template.bind({})
AnsweredNo.args = {
  check: {
    ...check,
    answer: 'NO',
  },
}

export const Inactive = Template.bind({})
Inactive.args = {
  check: {
    ...check,
    inactive: true,
    answer: 'UNANSWERED',
  },
}
