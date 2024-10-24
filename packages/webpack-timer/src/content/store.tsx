import { create } from 'zustand'

interface Message {
  text: string
  duration: number
}
interface Store {
  messages: Message[]
  push: (message: Message) => void
}

export const useStore = create<Store>((set) => ({
  messages: [],
  push: (message: Message) => set((state) => ({
    messages: [...state.messages, message]
  })),
}))