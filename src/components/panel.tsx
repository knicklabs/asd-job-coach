import { useState } from 'react'
import { z } from 'zod'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

import { Chat } from './chat'
import { ProfileForm, ProfileFormSchema } from './profile-form'

export function Panel({ isProduction = false }: { isProduction?: boolean }) {
  let session: any = null

  const [profile, setProfile] = useState<z.infer<typeof ProfileFormSchema>>({
    accommodations: '',
    conditions: '',
    idealJob: '',
  })

  async function getSession() {
    console.log('Getting session')
    if (!isProduction) {
      console.log('Not in production, returning null')
      return null
    }

    if (session) {
      console.log('Returning existing session')
      return session
    }

    const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
    const tab = tabs[0]

    if (!tab || !tab.id) {
      console.log('No tab found')
      return null
    }

    const activeTabId = tab.id

    console.log('Executing script')
    const results = await chrome.scripting.executeScript({
      target: { tabId: activeTabId },
      func: () => {
        let description = ''
        const descriptionHtml = document.querySelector('div.listing-container')
        if (descriptionHtml) {
          const clone = descriptionHtml.cloneNode(true) as HTMLElement
          clone
            .querySelectorAll('#time_zones')
            .forEach((node) => node.parentElement?.removeChild(node))
          description = clone.innerHTML
        }

        const companyName =
          document.querySelector('div.company-name')?.textContent?.trim() ?? ''
        const title = document.querySelector('h1')?.textContent?.trim() ?? ''

        return {
          companyName,
          title,
          description,
        }
      },
    })

    const jobData = JSON.stringify(results[0].result)
    const profileData = JSON.stringify({
      ...profile,
      conditions: `Autism,${profile.conditions}`,
    })

    let systemPrompt =
      'You are a helpful job coach with experience working with job seekers with Autism Spectrum Disorder (ASD). You are given a job description and a profile of a job seeker. You need to help the job seeker find a job that is a good fit for them.'
    systemPrompt += `\nHere is the json data for the job:\n${jobData}`
    systemPrompt += `\nHere is my profile:\n ${profileData}`

    // @ts-ignore
    session = await ai.languageModel.create({
      systemPrompt,
    })

    console.log('Created session', session)

    return session
  }

  async function handleMessage(message: string) {
    const session = await getSession()

    if (!session) {
      throw new Error('No ai session found')
    }

    console.log('Sending message to ai', message)
    return session.prompt(message)
  }

  function handleProfileSubmit(values: z.infer<typeof ProfileFormSchema>) {
    setProfile(values)
  }

  return (
    <Tabs
      defaultValue="job-coach"
      className="py-4 bg-gray-100 w-full h-full grid grid-rows-[auto_1fr] overflow-hidden"
    >
      <TabsList>
        <TabsTrigger value="job-coach">Job Coach</TabsTrigger>
        <TabsTrigger value="my-profile">My Profile</TabsTrigger>
      </TabsList>
      <TabsContent
        className="border-t border-gray-200 bg-white h-full overflow-hidden"
        value="job-coach"
      >
        <Chat onSubmit={handleMessage} />
      </TabsContent>
      <TabsContent
        className="border-t border-gray-200 bg-white h-full overflow-hidden"
        value="my-profile"
      >
        <ProfileForm
          accommodations={profile.accommodations}
          conditions={profile.conditions}
          idealJob={profile.idealJob}
          onSubmit={handleProfileSubmit}
        />
      </TabsContent>
    </Tabs>
  )
}
