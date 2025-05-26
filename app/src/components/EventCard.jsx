// import { useEffect, useState } from "react";
// import { supabase } from "../supabase/client";
// import EventCard from "../components/EventCard";
// import { useNavigate } from "react-router-dom";

// export default function AdminDashboard() {
//   const [events, setEvents] = useState([]);
//   const navigate = useNavigate();

//   // Fetch pending events
//   const fetchEvents = async () => {
//     const { data, error } = await supabase
//       .from("events")
//       .select("*")
//       .eq("status", "pending");
//     if (!error) setEvents(data);
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   // Handle Approve/Reject
//   const handleAction = async (id, status) => {
//     await supabase.from("events").update({ status }).eq("id", id);
//     fetchEvents();
//   };

//   // Logout handler
//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     navigate("/login");
//   };

//   return (
//     <div className="admin-dashboard p-4 grid gap-4 grid-cols-1 md:grid-cols-2">
//       <div className="logout-container" style={{ gridColumn: "1 / -1", textAlign: "right", marginBottom: "1rem" }}>
//         <button
//           className="logout-button"
//           onClick={handleLogout}
//           style={{
//             backgroundColor: "#e53e3e",
//             color: "white",
//             border: "none",
//             padding: "0.5rem 1rem",
//             borderRadius: "6px",
//             cursor: "pointer",
//             fontWeight: "bold",
//           }}
//         >
//           Logout
//         </button>
//       </div>

//       {events.length === 0 ? (
//         <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
//           No pending events.
//         </p>
//       ) : (
//         events.map((event) => (
//           <EventCard
//             key={event.id}
//             event={event}
//             onAction={(status) => handleAction(event.id, status)}
//           />
//         ))
//       )}
//     </div>
//   );
// }


// EventCard.jsx
export default function EventCard({ event, onAction }) {
  return (
    <div className="event-card">
      {event.image_url && (
        <img src={event.image_url} alt={event.title} />
      )}
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>

      <div className="action-buttons">
        <button className="approve" onClick={() => onAction("approved")}>
          Approve
        </button>
        <button className="reject" onClick={() => onAction("rejected")}>
          Reject
        </button>
      </div>
    </div>
  );
}
