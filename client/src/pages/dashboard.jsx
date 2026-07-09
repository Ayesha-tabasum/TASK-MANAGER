import { useState, useEffect } from "react";
import { getTask } from "../services/taskServices";
import { searchTask } from "../services/taskServices";
import { editTask, deleteTask } from "../services/taskServices";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [task, setTask] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const loadData = async () => {
      if (keyword.trim() !== "") {
        const data = await searchTask(keyword);
        setTask(data);
      } else {
        const data = await getTask(page, 10);

        setTask(data.tasks);
        setTotalPages(data.totalPages);
      }
    };

    loadData();
  }, [keyword, page]);

  const handleEdit = async (id, oldTitle, oldDesc) => {
    const newTitle = prompt("Enter new title", oldTitle);
    const newDesc = prompt("Enter new description", oldDesc);

    if (!newTitle || !newDesc) return;

    await editTask(id, {
      title: newTitle,
      description: newDesc,
    });

    setTask((prev) =>
      prev.map((t) =>
        t._id === id ? { ...t, title: newTitle, desc: newDesc } : t,
      ),
    );
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
    "Are you sure you want to delete this task?"
  );

  if (!confirmDelete) return;
    await deleteTask(id);

    setTask((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="user">
        <h3>Welcome  </h3>
            <h2>{user?.name}</h2>
        <p>Role: {user?.role}</p>
      </div>

      <div className="second-part">
        <div className="search-box">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input placeholder="Search" className="search" type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="btn">
          {user?.role === "admin" && <button>Delete User</button>}
        </div>
      </div>

      <div className="grid-task">
        {task.map((t) => (
          <div
            className={`tasks priority-${t.priority.toLowerCase()}`}
            key={t._id}
          >
            <h2>{t.title}</h2>
            <p>{t.description}</p>

            <div className="flex">
              <span className="state">
                {t.status === "COMPLETE" ? (
                  <>
                    <i className="fa-solid fa-check"></i> Completed
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-hourglass-half"></i> Pending
                  </>
                )}
              </span>

              <span>
                <h4>{t.priority}</h4>
              </span>
            </div>

            <div className="edit-button">
              <button onClick={() => handleEdit(t._id, t.title,t.description)}>
                <i className="fa-solid fa-pen"></i>EDIT
              </button>
              <button onClick={() => handleDelete(t._id)}>
                <i className="fa-solid fa-trash-can"></i>DELETE
              </button>
            </div>

            <div className="date">
              <p>Created: {new Date(t.createdAt).toLocaleDateString()}</p>

              <p>Updated: {new Date(t.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination-button">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default Dashboard;
