import type { StoryFn, Meta } from '@storybook/react'

import { Error } from './Error.component'

export default {
  title: 'Components/Common/Error',
  component: Error,
  argTypes: {
    disabled: { control: 'boolean' },
    type: { control: 'string' },
    onClick: { action: 'clicked' },
  },
} as Meta<typeof Error>

const Template: StoryFn<typeof Error> = args => <Error {...args} />

export const Default = Template.bind({})
Default.args = {}
