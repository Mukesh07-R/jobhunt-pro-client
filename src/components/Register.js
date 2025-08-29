// src/pages/Register.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api"; // ✅ import API object

function Register({ setIsLoggedIn }) { // ✅ optional: update App state on register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await fetch(`${API.register}`, {  // ✅ use API.register
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        if (setIsLoggedIn) setIsLoggedIn(true); // ✅ optional: set login state
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
    <div className="card w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4">Register</h3>
      <input
        className="input-field"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className="input-field"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleRegister} className="btn-primary mt-2">
        Register
      </button>
    </div>
  );
}

export default Register;