/**
 * Adapted from ShadCN UI React Hook Form
 * @see https://ui.shadcn.com/docs/components/form
 */
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from './ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'

export const ProfileFormSchema = z.object({
  name: z.string(),
})

interface ProfileFormProps {
  onSubmit: (values: z.infer<typeof ProfileFormSchema>) => void
}

export function ProfileForm({ onSubmit }: ProfileFormProps) {
  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      name: '',
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormDescription>
                This is what your job coach will call you.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update my profile</Button>
      </form>
    </Form>
  )
}
