import React from 'react'

export default function SessionItem({ session, onOpen }) {
  return (
    <li className="p-3 bg-white rounded shadow-sm flex justify-between items-center">
      <div>
        <div className="font-medium">{session.title}</div>
        <div className="text-xs text-gray-500">{new Date(session.created_at).toLocaleString()}</div>
      </div>
      <div>
        <button onClick={onOpen} className="px-3 py-1 border rounded">Open</button>
      </div>
    </li>
  )
}
