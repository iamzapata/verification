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

export const Unselected = Template.bind({})
Unselected.args = {
  children: 'Yes',
  type: 'button',
}

export const Selected = Template.bind({})
Selected.args = {
  selected: true,
  children: 'No',
  type: 'button',
}

export const Inactive = Template.bind({})
Inactive.args = {
  inactive: true,
  children: 'No',
  type: 'button',
}

export const IsStart = Template.bind({})
IsStart.args = {
  selected: true,
  start: true,
  children: 'No',
  type: 'button',
}

export const IsEnd = Template.bind({})
IsEnd.args = {
  selected: true,
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
