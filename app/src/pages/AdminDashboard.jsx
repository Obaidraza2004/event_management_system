import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import EventCard from "../components/EventCard";
import { useNavigate } from "react-router-dom";
import "../style/AdminDashboard.css";


export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("status", "pending");

    if (!error) {
      setEvents(data);
    } else {
      console.error("Error fetching events:", error.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAction = async (id, status) => {
    await supabase.from("events").update({ status }).eq("id", id);
    fetchEvents();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="admin-dashboard p-4">
      <div className="flex justify-end mb-4">
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">No pending events.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onAction={(status) => handleAction(event.id, status)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
