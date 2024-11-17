import type { Meta, StoryObj } from '@storybook/react'

import { Panel } from '../components/panel'

const meta = {
  title: 'Panel',
  component: Panel,
} satisfies Meta<typeof Panel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
