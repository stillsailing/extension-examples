import { create } from 'zustand'

interface Message {
  text: string
  duration: number
  id: number
}

interface Store {
  messages: Message[]
  push: (message: Omit<Message, 'id'>) => void
}

let messageId = 0

export const useStore = create<Store>((set) => ({
  messages: [],
  push: (message) => {
    messageId++
    const newMessage = { ...message, id: messageId }

    set((state) => ({
      messages: [...state.messages, newMessage],
    }))

    setTimeout(() => {
      set((state) => ({
        messages: state.messages.filter((msg) => msg.id !== newMessage.id),
      }))
    }, message.duration)
  },
}))

/**
 * 
 * @param text 
 * @param duration milliseconds
 */
export function showMessage(text: string, duration: number) {
  const { push } = useStore.getState()
  push({ text, duration })
}
