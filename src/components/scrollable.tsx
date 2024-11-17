import { ScrollArea } from './ui/scroll-area'

export function Scrollable({ children }: { children: React.ReactNode }) {
  return <ScrollArea className="h-full p-4 w-full">{children}</ScrollArea>
}
