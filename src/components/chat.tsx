import { useRef, useState } from 'react'

import { Send } from 'lucide-react'

import DOMPurify from 'dompurify'
import { marked } from 'marked'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'

type Message = {
  id: string
  authorName: string
  avatarFallback: string
  message: string
  status: 'pending' | 'success' | 'error'
}

function Message({
  authorName,
  avatarFallback,
  message,
  reverse = false,
  status,
}: Omit<Message, 'id'> & { reverse: boolean }) {
  return (
    <div
      className={`flex gap-4 ${reverse ? 'flex-row-reverse' : ''} ${status === 'pending' ? 'motion-safe:animate-pulse' : ''}`}
    >
      <Avatar data-avatar="true">
        <AvatarFallback
          className={avatarFallback === 'JC' ? 'bg-blue-100' : 'bg-gray-100'}
        >
          {avatarFallback}
        </AvatarFallback>
      </Avatar>
      <div className="rounded-sm border border-gray-200 bg-white py-3 px-4 shadow-sm">
        <div
          className={`text-xs font-lignt leading-none text-muted-foreground mb-1 ${reverse ? 'text-right' : ''}`}
        >
          {authorName}
        </div>
        <div
          className={`prose prose-sm ${status === 'error' ? 'text-red-800' : status === 'pending' ? 'text-muted' : ''}`}
          dangerouslySetInnerHTML={{
            __html: status === 'pending' ? '...' : message,
          }}
        />
      </div>
    </div>
  )
}

export function Chat({
  authorName = 'Me',
  coachName = 'Job Coach',
  onSubmit = async () => Promise.reject('Something went wrong.'),
}: {
  authorName?: string
  coachName?: string
  onSubmit?: (message: string) => Promise<string>
}) {
  const messagesRef = useRef<HTMLUListElement>(null)

  const scrollToBottom = () => {
    setTimeout(() => {
      const avatars =
        messagesRef.current?.querySelectorAll('[data-avatar]') ?? []
      const lastAvatar = avatars[avatars.length - 1]

      if (lastAvatar) {
        lastAvatar.scrollIntoView({ behavior: 'smooth' })
      }
    }, 10)
  }

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>([
    'Is this job a good fit for me?',
    'What are the key responsibilities of this role?',
    'What are the skills required for this role?',
    'What is the company culture like?',
    'What are the benefits of working at this company?',
  ])

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault()
    setMessage(e.target.value)
  }

  function handleSuggestedMessageClick(message: string) {
    setSuggestedMessages(suggestedMessages.filter((msg) => msg !== message))

    handleSubmit(undefined, message)
  }

  function handleSubmit(e?: React.FormEvent<HTMLFormElement>, msg?: string) {
    e && e.preventDefault()
    setLoading(true)

    // Create the user's message
    const userMessage = {
      authorName,
      avatarFallback: 'ME',
      id: crypto.randomUUID(),
      message: DOMPurify.sanitize(marked.parse(msg ?? message) as string),
      status: 'success' as const,
    }

    let updatedMessages = [...messages, userMessage]

    setMessages(updatedMessages)

    // Clear the textarea
    setMessage('')

    // Scroll into view
    scrollToBottom()

    setTimeout(async () => {
      // Create the coach's message
      const coachMessage = {
        authorName: coachName,
        avatarFallback: 'JC',
        id: crypto.randomUUID(),
        message: '',
        status: 'pending' as const,
      }

      updatedMessages = [...messages, userMessage, coachMessage]

      // Append the user's and coach's messages to the messages array
      setMessages(updatedMessages)

      // Scroll into view
      scrollToBottom()

      try {
        // Get the response from the coach
        const response = await onSubmit(userMessage.message)

        // Update the coach's message with the response.
        setMessages(
          updatedMessages.map((message) =>
            message.id === coachMessage.id
              ? {
                  ...message,
                  message: DOMPurify.sanitize(marked.parse(response) as string),
                  status: 'success' as const,
                }
              : message
          )
        )
      } catch (error) {
        console.error(error)
        // Update the messages array with the updated coach's message.
        setMessages(
          updatedMessages.map((message) =>
            message.id === coachMessage.id
              ? {
                  ...message,
                  message: "Sorry. I couldn't help you with that.",
                  status: 'error' as const,
                }
              : message
          )
        )
      } finally {
        setLoading(false)
        scrollToBottom()
      }
    }, 1500)
  }

  return (
    <div className="w-full h-full overflow-hidden grid grid-rows-[1fr_auto]">
      <ScrollArea className="bg-white p-4">
        {messages.length > 0 && (
          <ul className="space-y-8" ref={messagesRef}>
            {messages.map((message, index) => (
              <li key={message.id}>
                <Message {...message} reverse={index % 2 === 1} />
              </li>
            ))}
          </ul>
        )}
        {!loading && suggestedMessages.length > 0 && (
          <ul className="space-y-2 text-center mt-8">
            {suggestedMessages.map((message) => (
              <li key={message}>
                <Button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault()
                    handleSuggestedMessageClick(message)
                  }}
                  variant="outline"
                  size="sm"
                >
                  {message}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </ScrollArea>
      <form
        className="bg-gray-50 grid w-full gap-2 p-4 border-t border-gray-200 shadow-lg"
        onSubmit={handleSubmit}
      >
        <Textarea
          autoFocus
          aria-label="Message"
          className="bg-white"
          onChange={handleChange}
          value={message}
        />
        <Button
          disabled={loading || message.length === 0}
          type="submit"
          size="lg"
        >
          <Send /> Ask your job coach
        </Button>
      </form>
    </div>
  )
}
