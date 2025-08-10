import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useParams, useNavigate } from 'react-router-dom'
import MessageBubble from '../components/MessageBubble'

export default function Chat({ user }) {
  const { id } = useParams()
  const [messages, setMessages] = useState([])
  const [content, setContent] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchMessages()

    // Subscribe to new messages
    const channel = supabase
      .channel('room-messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `session_id=eq.${id}` }, payload => {
        setMessages(prev => [...prev, payload.new])
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [id])

  async function fetchMessages() {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('session_id', id)
      .order('created_at', { ascending: true })

    if (!error) setMessages(data)
  }

  async function sendMessage(e) {
    e.preventDefault()
    if (!content.trim()) return
    await supabase.from('messages').insert({
      session_id: id,
      sender_id: user.id,
      content
    })
    setContent('')
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 bg-gray-200 flex justify-between">
        <button onClick={() => navigate('/')} className="text-blue-500">← Back</button>
        <h1 className="font-bold">Chat</h1>
        <div></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100">
        {messages.map(msg => (
          <MessageBubble key={msg.id} msg={msg} isOwn={msg.sender_id === user.id} />
        ))}
      </div>

      <form onSubmit={sendMessage} className="p-4 bg-white flex gap-2">
        <input
          className="border p-2 flex-grow rounded"
          placeholder="Type a message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
      </form>
    </div>
  )
}
