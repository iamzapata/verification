import type { StoryFn, Meta } from '@storybook/react'

import { ButtonGroup } from './ButtonGroup.component'

export default {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  argTypes: {},
} as Meta<typeof ButtonGroup>

const Template: StoryFn<typeof ButtonGroup> = (args) => (
  <ButtonGroup {...args} />
)

export const Default = Template.bind({})
Default.args = {}

export const Inactive = Template.bind({})
Inactive.args = {
  inactive: true,
}
