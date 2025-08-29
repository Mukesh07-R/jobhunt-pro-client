import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api"; // ✅ central API file

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API.login}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token); // ✅ save token
        setIsLoggedIn(true); // ✅ update state
        alert("Login successful");
        navigate("/add-job"); // ✅ redirect
      } else {
        alert("No token received. Login failed.");
      }

      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="card w-full max-w-md mx-auto p-6 shadow-lg rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Login</h3>
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
      <button onClick={handleLogin} className="btn-primary w-full">
        Login
      </button>
    </div>
  );
}

export default Login;