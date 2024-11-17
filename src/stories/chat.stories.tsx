import type { Meta, StoryObj } from '@storybook/react'

import { Chat } from '../components/chat'

const meta = {
  title: 'Chat',
  component: Chat,
} satisfies Meta<typeof Chat>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
