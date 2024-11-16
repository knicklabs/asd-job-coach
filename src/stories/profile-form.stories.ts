import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { ProfileForm } from '../components/profile-form'

const meta = {
  title: 'Profile Form',
  component: ProfileForm,
  parameters: {
    layout: 'centered',
  },
  args: { onSubmit: fn() },
} satisfies Meta<typeof ProfileForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
