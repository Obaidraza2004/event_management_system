import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Event App</h1>
      <div className="space-x-4">
        <Link to="/user-dashboard">User</Link>
        <Link to="/admin-dashboard">Admin</Link>
      </div>
    </nav>
  );
}