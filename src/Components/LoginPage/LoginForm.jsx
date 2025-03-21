import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../navBar/NavBar";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Processing...");

    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch("https://rrn24.techchantier.site/malingo/public/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok && data.token) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        console.log(sessionStorage);
        
        setIsSuccess(true);
        setMessage("Login successful!");
        setTimeout(() => navigate("/Home"), 2000);
      } else {
        setIsSuccess(false);
        setMessage(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setIsSuccess(false);
      setMessage("A network error occurred. Please check your connection.");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Welcome Back!</h2>
        <p className="text-center text-gray-500 mb-4">Login to continue exploring!</p>
        {message && (
          <div className={`p-2 text-center text-white rounded ${isSuccess ? "bg-green-500" : "bg-red-500"}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
            Login
          </button>
        </form>
        <div className="flex flex-col gap-2 mt-4">
          <button className="w-full bg-black text-white py-2 rounded hover:opacity-80 transition">
            Login with Apple
          </button>
          <button className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition">
            Login with Google
          </button>
        </div>
        <p className="text-center text-gray-500 mt-4">
          Don't have an account? <Link to="/Signup" className="text-blue-500 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default LoginForm;
