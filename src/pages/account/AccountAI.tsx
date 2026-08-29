import { useState } from 'react'
import type { FormEvent } from 'react'
import { inputClass } from '../../lib/form'

type Message = {
  id: number
  role: 'user' | 'assistant'
  text: string
}

const starterMessage: Message = {
  id: 1,
  role: 'assistant',
  text: 'Hello! I am AFIAP AI. Ask me about our services, learning resources, or how to get started with your project.',
}

const AccountAI = () => {
  const [messages, setMessages] = useState<Message[]>([starterMessage])
  const [input, setInput] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      text: trimmed,
    }

    const assistantMessage: Message = {
      id: Date.now() + 1,
      role: 'assistant',
      text: 'Thank you for your message. AFIAP AI assistance is being expanded. For now, please use Contact AFIAP or browse Services for direct support.',
    }

    setMessages((current) => [...current, userMessage, assistantMessage])
    setInput('')
  }

  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm lg:p-8">
      <p className="text-xs font-bold uppercase tracking-widest text-blue-700">AFIAP AI</p>
      <h1 className="mt-2 text-2xl font-bold text-[#0a1628] sm:text-3xl">AI assistance</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
        Get quick guidance about AFIAP services and account features.
      </p>

      <div className="mt-8 flex h-[420px] flex-col rounded-xl border border-blue-100 bg-[#f4f7fc]">
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                message.role === 'user'
                  ? 'ml-auto bg-blue-800 text-white'
                  : 'bg-white text-slate-700 shadow-sm'
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="border-t border-blue-100 bg-white p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className={`${inputClass} !mt-0`}
              placeholder="Ask AFIAP AI..."
            />
            <button type="submit" className="btn-primary shrink-0 !px-5">Send</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AccountAI
