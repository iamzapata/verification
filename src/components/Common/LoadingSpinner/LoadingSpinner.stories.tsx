import type { StoryFn, Meta } from '@storybook/react'

import { LoadingSpinner } from './LoadingSpinner.component'

export default {
  title: 'Components/Common/LoadingSpinner',
  component: LoadingSpinner,
  argTypes: {},
} as Meta<typeof LoadingSpinner>

const Template: StoryFn<typeof LoadingSpinner> = () => <LoadingSpinner />

export const Default = Template.bind({})
Default.args = {}
