import { useEffect, useState } from "react";
import API from "../utils/api";
import TaskManager from "../components/TaskManager";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("users");

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      alert("Failed to fetch users");
    }
  };

  const toggleStatus = async (userId, currentStatus) => {
    try {
      await API.put(`/admin/users/status`, {
        userId,
        status: currentStatus === "active" ? "inactive" : "active",
      });
      fetchUsers();
    } catch (err) {
      alert("Failed to update user status");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4 min-h-[85vh] bg-gray-500">
      <div className="mb-6 flex gap-4 justify-center">
        <button
          className={`px-4 py-2 rounded font-semibold cursor-pointer ${
            activeTab === "users"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("users")}
        >
          Show User Management
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold cursor-pointer ${
            activeTab === "tasks"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("tasks")}
        >
          Show Task Manager
        </button>
      </div>
      {activeTab === "users" ? (
        <>
          <h2 className="text-2xl font-bold mb-4">
            Admin Panel - User Management
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded">
              <thead className="bg-gray-100 text-gray-700">
                <tr className="text-center">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2 ">Email</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2 ">Role</th>
                  <th className="px-4 py-2 ">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.length <= 0 ? (
                  <tr className="text-center w-full m-auto">
                    <td></td>
                    <td></td>
                    <td className="font-semibold p-2 text-lg">
                      No Data available
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u._id} className="border-t">
                      <td className="px-4 py-2 text-center">{u.name}</td>
                      <td className="px-4 py-2 text-center">{u.email}</td>
                      <td className="px-4 py-2 text-center capitalize">
                        {u.status}
                      </td>
                      <td className="px-4 py-2 text-center">{u.role}</td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => toggleStatus(u._id, u.status)}
                          className={`px-3 py-1 ${
                            u.status === "active"
                              ? "bg-red-600 hover:bg-red-700"
                              : "bg-blue-600 hover:bg-blue-700"
                          }  text-white rounded cursor-pointer`}
                        >
                          Set {u.status === "active" ? "Inactive" : "Active"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <TaskManager />
      )}
    </div>
  );
};

export default AdminPanel;
