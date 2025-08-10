import React from 'react'

export default function MessageBubble({ msg, isOwn }) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`px-4 py-2 rounded-lg max-w-xs ${isOwn ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
        <div>{msg.content}</div>
        <div className="text-xs opacity-70 mt-1">{new Date(msg.created_at).toLocaleTimeString()}</div>
      </div>
    </div>
  )
}