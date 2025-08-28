import React from "react";
import Register from "../components/Register";
import Login from "../components/Login";

function AuthPage({ setIsLoggedIn }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          JobHunt Pro (React)
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Register setIsLoggedIn={setIsLoggedIn} />
          <Login setIsLoggedIn={setIsLoggedIn} />
        </div>
      </div>
    </div>
  );
}

export default AuthPage;