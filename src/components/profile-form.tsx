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
import { ScrollArea } from './ui/scroll-area'
import { Textarea } from './ui/textarea'

export const ProfileFormSchema = z.object({
  accommodations: z.string(),
  conditions: z.string(),
  idealJob: z.string(),
})

interface ProfileFormProps {
  accommodations: string
  conditions: string
  idealJob: string
  onSubmit: (values: z.infer<typeof ProfileFormSchema>) => void
}

export function ProfileForm({
  accommodations = '',
  conditions = '',
  idealJob = '',
  onSubmit,
}: ProfileFormProps) {
  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      accommodations,
      conditions,
      idealJob,
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col h-full overflow-hidden"
        id="profile-form"
      >
        <ScrollArea className="max-h-full grow overflow-hidden">
          <div className="space-y-8 overflow-hidden p-4">
            <FormField
              control={form.control}
              name="idealJob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ideal job</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    Describe the ideal job our are looking for.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accommodations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Accommodations</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    Describe any accommodations you need to work.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="conditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other conditions</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Besides autistm, list any other conditions you have that may
                    affect your ability to work.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </ScrollArea>
        <Button className="flex-grow-0 m-4" form="profile-form" type="submit">
          Update my profile
        </Button>
      </form>
    </Form>
  )
}
