// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../supabase/client";
// import "../style/Signup.css";

// export default function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setErrorMsg(""); // clear previous error

//     const { error } = await supabase.auth.signUp({ email, password });

//     if (error) {
//       if (error.message.includes("User already registered") || error.message.includes("already")) {
//         setErrorMsg("This email is already registered. Please log in instead.");
//       } else {
//         setErrorMsg("Signup failed: " + error.message);
//       }
//     } else {
//       alert("Signup successful! Please check your email to confirm and then log in.");
//       navigate("/login");
//     }
//   };

//   return (
//     <div className="signup-container">
//       <form onSubmit={handleSignup} className="signup-form">
//         <h2>Sign Up</h2>
//         {errorMsg && <p className="error-text">{errorMsg}</p>}
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         />
//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import { useNavigate, Link } from "react-router-dom";
import "../style/Signup.css";


export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check for existing session
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };
    fetchUser();
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      alert("Signup failed: " + error.message);
    } else {
      alert("Signup successful!");
      navigate("/login");
    }
  };

  // If already logged in
  if (user) {
    return (
      <div className="signup-container">
        <h2>You are already logged in.</h2>
        <Link to="/user-dashboard">
          <button>Go to Dashboard</button>
        </Link>
      </div>
    );
  }

  // Signup form
  return (
    <div className="signup-container">
      <form onSubmit={handleSignup} className="signup-form">
        <h2>Sign Up</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
