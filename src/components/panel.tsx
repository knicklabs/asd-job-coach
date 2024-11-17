import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

import { Chat } from './chat'
import { ProfileForm } from './profile-form'

export function Panel() {
  return (
    <Tabs defaultValue="job-coach" className="py-4 bg-gray-100 w-full h-full grid grid-rows-[auto_1fr] overflow-hidden">
      <TabsList>
        <TabsTrigger value="job-coach">Job Coach</TabsTrigger>
        <TabsTrigger value="my-profile">My Profile</TabsTrigger>
      </TabsList>
      <TabsContent className="border-t border-gray-200 bg-white h-full overflow-hidden"value="job-coach">
        <Chat />
      </TabsContent>
      <TabsContent className="border-t border-gray-200 bg-white h-full overflow-hidden" value="my-profile">
        <ProfileForm onSubmit={() => {}} />
      </TabsContent>
    </Tabs>
  )
}
