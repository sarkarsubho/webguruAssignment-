import { useEffect, useState } from "react";
import API from "../utils/api";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTasks = async (pageNum = 1) => {
    try {
      const res = await API.get(`/admin/tasks?page=${pageNum}`);
      setTasks(res.data.tasks);
      setPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch {
      alert("Failed to fetch tasks");
    }
  };

  const toggleSelect = (id) => {
    const updated = new Set(selected);
    updated.has(id) ? updated.delete(id) : updated.add(id);
    setSelected(updated);
  };

  const selectAllOnPage = () => {
    const ids = tasks.map((t) => t._id);
    const updated = new Set(selected);
    ids.forEach((id) => updated.add(id));
    setSelected(updated);
  };

  const bulkUpdate = async (newStatus) => {
    try {
      await API.put("/admin/tasks/bulk_update", {
        taskIds: [...selected],
        status: newStatus,
      });
      setSelected(new Set());
      fetchTasks(page);
    } catch {
      alert("Bulk update failed");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Task Manager</h2>

      <div className="flex flex-col md:flex-row justify-between items-center gap-2 mb-4">
        <button
          onClick={selectAllOnPage}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
        >
          Select All on Page
        </button>

        <p className="text-gray-700 font-medium">
          Selected Tasks: {selected.size}
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => bulkUpdate("completed")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Mark as Completed
          </button>

          <button
            onClick={() => bulkUpdate("pending")}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Mark as Pending
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded mb-4">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Select</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selected.has(t._id)}
                    onChange={() => toggleSelect(t._id)}
                  />
                </td>
                <td className="px-4 py-2">{t.title}</td>
                <td className="px-4 py-2 capitalize">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      t.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center flex-wrap gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => fetchTasks(i + 1)}
            disabled={i + 1 === page}
            className={`px-4 py-2 rounded ${
              i + 1 === page
                ? "bg-blue-600 text-white cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Page {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
