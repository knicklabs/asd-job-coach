/**
 * Adapted from ShadCN UI React Hook Form
 * @see https://ui.shadcn.com/docs/components/form
 */
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
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

const accommodations = [
  {
    id: 'additional-training',
    label: 'Additional training',
  },
  {
    id: 'alternate-communication-methods',
    label: 'Alternate communication methods',
  },
  {
    id: 'extra-time',
    label: 'Extra time',
  },
  {
    id: 'flexible-schedule',
    label: 'Flexible schedule',
  },
  {
    id: 'modified-duties',
    label: 'Modified duties',
  },
  {
    id: 'physical-accommodations',
    label: 'Physical accommodations(i.e. wheelchair access, quiet room)',
  },
  {
    id: 'reminders',
    label: 'Reminders',
  },
  {
    id: 'sensory-accommodations',
    label: 'Sensory accommodations (i.e. noise or lighting)',
  },
  {
    id: 'support-animal',
    label: 'Support animal',
  },
  {
    id: 'support-person',
    label: 'Support aerson',
  },
  {
    id: 'work-from-home',
    label: 'Work from home',
  },
]

export const ProfileFormSchema = z.object({
  accommodations: z.array(z.string()),
  name: z.string(),
})

interface ProfileFormProps {
  onSubmit: (values: z.infer<typeof ProfileFormSchema>) => void
}

export function ProfileForm({ onSubmit }: ProfileFormProps) {
  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      accommodations: [],
      name: 'none',
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
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base">Accommodations</FormLabel>
            <FormDescription>
              Select the types of accomodations you need.
            </FormDescription>
          </div>
          {accommodations.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name="accommodations"
              render={({ field }) => {
                return (
                  <FormItem
                    key={item.id}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.id])
                            : field.onChange(
                              field.value?.filter(
                                (value) => value !== item.id
                              )
                            )
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {item.label}
                    </FormLabel>
                  </FormItem>
                )
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
        <Button type="submit">Update my profile</Button>
      </form>
    </Form>
  )
}
