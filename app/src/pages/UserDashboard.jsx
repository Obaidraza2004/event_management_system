import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import EventForm from "../components/EventForm";
import "../style/UserDashboard.css";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Fetch logged-in user
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUser(user);
    });
  }, []);

  // Fetch events of this user
  const fetchEvents = async (userId) => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching events:", error.message);
    } else {
      setEvents(data);
    }
  };

  // Fetch events when user is set and listen for changes
  useEffect(() => {
    if (user) {
      fetchEvents(user.id);

      const subscription = supabase
        .channel("public:events")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "events", filter: `user_id=eq.${user.id}` },
          () => fetchEvents(user.id)
        )
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    }
  }, [user]);

  // Handle Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="user-dashboard p-4">
      <div className="dashboard-header flex justify-between items-center mb-6">
        <h1>Submit New Event</h1>
        <button className="logout-button bg-red-600 text-white px-4 py-2 rounded" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {user && <EventForm user={user} />}

      <h2 className="mt-8 mb-4">Your Submitted Events</h2>

      {events.length === 0 ? (
        <p>You have not submitted any events yet.</p>
      ) : (
        <ul className="event-list grid gap-4 grid-cols-1 md:grid-cols-2">
          {events.map((event) => (
            <li key={event.id} className="event-card border rounded p-4 shadow">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="mb-2">{event.description}</p>
              <p className="mb-1"><strong>Location:</strong> {event.location}</p>
              <p className="mb-2"><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
              {event.image_url && (
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="event-image w-full h-48 object-cover rounded mb-3"
                />
              )}
              <p className="event-status font-bold">
                Status:{" "}
                <span
                  className={
                    event.status === "approved"
                      ? "text-green-600"
                      : event.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }
                >
                  {event.status.toUpperCase()}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
