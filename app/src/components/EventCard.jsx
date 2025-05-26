
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
