import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api"; // ✅ central API URLs

function Register({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await fetch(API.register, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token); // ✅ save token
        if (setIsLoggedIn) setIsLoggedIn(true);
        alert("Registration successful");
        navigate("/add-job"); // ✅ redirect
      } else {
        alert(data.message || "Registration failed");
      }

      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Something went wrong");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="card w-full max-w-md mx-auto p-6 shadow-lg rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Register</h3>
      <input
        className="input-field mb-3"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className="input-field mb-3"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleRegister} className="btn-primary w-full">
        Register
      </button>
    </div>
  );
}

export default Register;