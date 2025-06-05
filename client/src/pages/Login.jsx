import { useState } from "react";
import API from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login,logout } = useAuth();
  const navigate = useNavigate();

  const gotoRegister = () => {
    navigate("/register");
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data.user, res.data.token);
      navigate(res.data.user.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
      logout(); 
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer transition duration-200"
        >
          Login
        </button>

        <div>
            <p className="mt-4 text-center text-gray-600">
                Don't have an account?{" "}
                <button
                onClick={gotoRegister}
                className="text-blue-600 hover:underline"
                >
                Register
                </button>
            </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
