import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AuthPage from "./Pages/authpage";
import AddJob from "./components/AddJob";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/verify-token", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok && data.valid) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error("Token validation failed:", err);
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    validateToken();

    window.addEventListener("storage", validateToken);
    return () => window.removeEventListener("storage", validateToken);
  }, []);

  if (loading) return <div className="text-center mt-10">🔄 Checking login status...</div>;

 return (
    <Router>
      <Routes>
        {/* ✅ Public Route */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/add-job" /> : <AuthPage setIsLoggedIn={setIsLoggedIn} />} />

        {/* ✅ Protected Route */}
        <Route
          path="/add-job"
          element={isLoggedIn ? <AddJob /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;

