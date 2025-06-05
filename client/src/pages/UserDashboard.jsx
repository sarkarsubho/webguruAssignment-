import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api";
import { useEffect } from "react";

const UserDashboard = () => {
  const { user,logout } = useAuth();
  const navigate = useNavigate();


  const checkStatus = async (userId, currentStatus) => {
    try {
      await API.get(`/user/getstatus`).then((res) => {
        if (res.data.status === "inactive") {
          alert("You are inactive, please contact admin");
          navigate("/");
        }
        if (res.data.status === "active") {
          console.log("User is active");
        }
      });
    } catch (err) {
      alert("loged out or inactive");
      logout();
      navigate("/");
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <div className="container mx-auto p-4 min-h-[85vh] bg-gray-50 text-center">
      <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
      <h2>Welcome, {user?.name}</h2>
      <p>This will be your personal dashboard (can add tasks later)</p>
    </div>
  );
};

export default UserDashboard;
