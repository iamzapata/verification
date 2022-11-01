import type { StoryFn, Meta } from '@storybook/react'

import { Button } from './Button.component'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    disabled: { control: 'boolean' },
    type: { control: 'string' },
    onClick: { action: 'clicked' },
  },
} as Meta<typeof Button>

const Template: StoryFn<typeof Button> = (args) => (
  <Button onClick={() => null} {...args}>
    {args.children}
  </Button>
)

export const Enabled = Template.bind({})
Enabled.args = {
  disabled: false,
  children: 'Yes',
  type: 'button',
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  children: 'Yes',
  type: 'button',
}
