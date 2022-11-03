import type { StoryFn, Meta } from '@storybook/react'

import { ButtonGroup } from './ButtonGroup.component'
import { mockChecks as checks } from '@testing'

const check = checks[0]

export default {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  argTypes: {},
} as Meta<typeof ButtonGroup>

const Template: StoryFn<typeof ButtonGroup> = args => <ButtonGroup {...args} />

export const Default = Template.bind({})
Default.args = {
  check,
}

export const Inactive = Template.bind({})
Inactive.args = {
  inactive: true,
  check,
}
