// import { useState, useEffect } from "react";
// import { supabase } from "../supabaseClient";
// import { useNavigate } from "react-router-dom";

// export default function Sessions() {
//   const [sessions, setSessions] = useState([]);
//   const [newSessionTitle, setNewSessionTitle] = useState("");
//   const [joinSessionId, setJoinSessionId] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchSessions();
//   }, []);

//   async function fetchSessions() {
//     const { data, error } = await supabase
//       .from("sessions")
//       .select("*")
//       .order("created_at", { ascending: false });
//     if (!error) setSessions(data);
//   }

//   async function createSession() {
//     const user = (await supabase.auth.getUser()).data.user;
//     if (!newSessionTitle.trim()) return;

//     const { data: session, error: sessionError } = await supabase
//       .from("sessions")
//       .insert([{ title: newSessionTitle, created_by: user.id }])
//       .select()
//       .single();

//     if (sessionError) {
//       console.error(sessionError);
//       return;
//     }

//     await supabase.from("participants").insert([
//       { session_id: session.id, user_id: user.id }
//     ]);

//     navigate(`/chat/${session.id}`);
//   }

//   async function joinSession() {
//     const user = (await supabase.auth.getUser()).data.user;
//     if (!joinSessionId.trim()) return;

//     const { error } = await supabase
//       .from("participants")
//       .insert([{ session_id: joinSessionId, user_id: user.id }]);

//     if (error) {
//       console.error(error);
//       return;
//     }

//     navigate(`/chat/${joinSessionId}`);
//   }

//   async function logout() {
//     await supabase.auth.signOut();
//     navigate("/login");
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">💬 My Sessions</h1>
//         <button
//           onClick={logout}
//           className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Action boxes */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         {/* New session */}
//         <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col gap-3">
//           <h2 className="text-lg font-semibold text-gray-700">➕ Create New Session</h2>
//           <input
//             type="text"
//             placeholder="Enter session title..."
//             value={newSessionTitle}
//             onChange={(e) => setNewSessionTitle(e.target.value)}
//             className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
//           />
//           <button
//             onClick={createSession}
//             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition"
//           >
//             Create
//           </button>
//         </div>

//         {/* Join session */}
//         <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col gap-3">
//           <h2 className="text-lg font-semibold text-gray-700">🔗 Join Session</h2>
//           <input
//             type="text"
//             placeholder="Enter session ID..."
//             value={joinSessionId}
//             onChange={(e) => setJoinSessionId(e.target.value)}
//             className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
//           />
//           <button
//             onClick={joinSession}
//             className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition"
//           >
//             Join
//           </button>
//         </div>
//       </div>

//       {/* Session list */}
//       <div className="bg-white rounded-xl shadow-lg p-5">
//         <h2 className="text-lg font-semibold text-gray-700 mb-4">📂 Your Sessions</h2>
//         {sessions.length === 0 ? (
//           <p className="text-gray-500 text-sm">No sessions yet. Create or join one!</p>
//         ) : (
//           <ul className="space-y-3">
//             {sessions.map((session) => (
//               <li
//                 key={session.id}
//                 className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 rounded-lg p-4 shadow-sm transition"
//               >
//                 <div>
//                   <p className="font-medium text-gray-800">{session.title}</p>
//                   <p className="text-xs text-gray-500">
//                     {new Date(session.created_at).toLocaleString()}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => navigate(`/chat/${session.id}`)}
//                   className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-lg shadow-md transition"
//                 >
//                   Open
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }









import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [newSessionTitle, setNewSessionTitle] = useState("");
  const [joinSessionId, setJoinSessionId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchSessions();
  }, []);

  async function fetchSessions() {
    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setSessions(data);
  }

  async function createSession() {
    const user = (await supabase.auth.getUser()).data.user;
    if (!newSessionTitle.trim()) return;

    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .insert([{ title: newSessionTitle, created_by: user.id }])
      .select()
      .single();

    if (sessionError) {
      console.error(sessionError);
      return;
    }

    await supabase.from("participants").insert([
      { session_id: session.id, user_id: user.id }
    ]);

    navigate(`/chat/${session.id}`);
  }

  async function joinSession() {
    const user = (await supabase.auth.getUser()).data.user;
    if (!joinSessionId.trim()) return;

    const { error } = await supabase
      .from("participants")
      .insert([{ session_id: joinSessionId, user_id: user.id }]);

    if (error) {
      console.error(error);
      return;
    }

    navigate(`/chat/${joinSessionId}`);
  }

  async function logout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">💬 My Sessions</h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 text-lg rounded-lg shadow-md transition"
        >
          Logout
        </button>
      </div>

      {/* Action boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* New session */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-700">➕ Create New Session</h2>
          <input
            type="text"
            placeholder="Enter session title..."
            value={newSessionTitle}
            onChange={(e) => setNewSessionTitle(e.target.value)}
            className="border rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button
            onClick={createSession}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 text-lg rounded-lg shadow-md transition"
          >
            Create
          </button>
        </div>

        {/* Join session */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-700">🔗 Join Session</h2>
          <input
            type="text"
            placeholder="Enter session ID..."
            value={joinSessionId}
            onChange={(e) => setJoinSessionId(e.target.value)}
            className="border rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-green-400 outline-none"
          />
          <button
            onClick={joinSession}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 text-lg rounded-lg shadow-md transition"
          >
            Join
          </button>
        </div>
      </div>

      {/* Session list */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-5">📂 Your Sessions</h2>
        {sessions.length === 0 ? (
          <p className="text-gray-500 text-lg">No sessions yet. Create or join one!</p>
        ) : (
          <ul className="space-y-4">
            {sessions.map((session) => (
              <li
                key={session.id}
                className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 rounded-lg p-5 shadow-sm transition"
              >
                <div>
                  <p className="font-medium text-lg text-gray-800">{session.title}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(session.created_at).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/chat/${session.id}`)}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 text-lg rounded-lg shadow-md transition"
                >
                  Open
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
