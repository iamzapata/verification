import type { StoryFn, Meta } from '@storybook/react'

import { ResultsSubmitted } from './ResultsSubmitted.component'

export default {
  title: 'Components/Common/ResultsSubmitted',
  component: ResultsSubmitted,
  argTypes: {
    disabled: { control: 'boolean' },
    type: { control: 'string' },
    onClick: { action: 'clicked' },
  },
} as Meta<typeof ResultsSubmitted>

const Template: StoryFn<typeof ResultsSubmitted> = () => <ResultsSubmitted />

export const Default = Template.bind({})
Default.args = {}
