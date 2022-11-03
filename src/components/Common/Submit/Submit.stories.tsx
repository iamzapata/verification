import type { StoryFn, Meta } from '@storybook/react'

import { Submit } from './Submit.component'

export default {
  title: 'Components/Common/Submit',
  component: Submit,
  argTypes: {},
} as Meta<typeof Submit>

const Template: StoryFn<typeof Submit> = args => <Submit {...args} />

export const Enabled = Template.bind({})
Enabled.args = {
  disabled: false,
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}
