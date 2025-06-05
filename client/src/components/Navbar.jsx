import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, token, login, logout } = useAuth();
  const navigate = useNavigate();
  const handleClick = () => {
    if (token) {
      logout();
      navigate("/");
    } else {
      navigate("/");
    }
  };
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center flex justify-between">
      <h2 className="font-semibold text-xl">Management</h2>
      <button
        className={`rounded ${
          token
            ? "bg-red-500 hover:bg-red-700"
            : "bg-blue-500 hover:bg-blue-700"
        } cursor-pointer p-2 text-white`}
        onClick={handleClick}
      >
        {" "}
        {token ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default Navbar;
