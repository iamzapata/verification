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

export const Inactive = Template.bind({})
Inactive.args = {
  children: 'Yes',
  type: 'button',
}

export const Active = Template.bind({})
Active.args = {
  active: true,
  children: 'No',
  type: 'button',
}

export const IsStart = Template.bind({})
IsStart.args = {
  active: true,
  start: true,
  children: 'No',
  type: 'button',
}

export const IsEnd = Template.bind({})
IsEnd.args = {
  active: true,
  end: true,
  children: 'No',
  type: 'button',
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  children: 'Yes',
  type: 'button',
}
