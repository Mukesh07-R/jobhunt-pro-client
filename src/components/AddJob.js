import { useState, useEffect } from "react";
import LogoutButton from "./LogoutButton";
import API from "../utils/api"; // ✅ correct

function AddJob() {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("applied");
  const [type, setType] = useState("full-time");
  const [joblocation, setJobLocation] = useState("");
  const [notes, setNotes] = useState("");

  const [jobs, setJobs] = useState([]);
  const [token, setToken] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) fetchJobs();
  }, [token]);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (err) {
      console.error("Fetch jobs error:", err);
    }
  };

  const handleForm = async () => {
    if (!token) return alert("Please login first");

    const job = { company, position, status, type, joblocation, notes };

    try {
      if (editId) {
        await API.put(`/jobs/${editId}`, job, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Job updated!");
      } else {
        await API.post("/jobs", job, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Job added!");
      }

      resetForm();
      fetchJobs();
    } catch (err) {
      console.error("Error saving job:", err);
      alert("Error saving job");
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      await API.delete(`/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEdit = (job) => {
    setEditId(job._id);
    setCompany(job.company);
    setPosition(job.position);
    setStatus(job.status);
    setType(job.type);
    setJobLocation(job.joblocation);
    setNotes(job.notes || "");
  };

  const resetForm = () => {
    setEditId(null);
    setCompany("");
    setPosition("");
    setStatus("applied");
    setType("full-time");
    setJobLocation("");
    setNotes("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex justify-end mb-4">
        <LogoutButton />
      </div>

      <div className="card w-full max-w-md mx-auto mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {editId ? "Edit Job" : "Add a Job"}
        </h3>

        <input
          className="input-field"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
        />
        <input
          className="input-field"
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder="Position"
        />

        <select
          className="input-field"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>

        <select
          className="input-field"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="internship">Internship</option>
          <option value="contract">Contract</option>
        </select>

        <input
          className="input-field"
          type="text"
          value={joblocation}
          onChange={(e) => setJobLocation(e.target.value)}
          placeholder="Location"
        />
        <input
          className="input-field"
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes"
        />

        <div className="flex gap-2 mt-2">
          <button onClick={handleForm} className="btn-primary">
            {editId ? "Update Job" : "Add Job"}
          </button>

          {editId && (
            <button
              onClick={resetForm}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full mt-4">
            No jobs added yet.
          </p>
        ) : (
          jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white border border-gray-200 shadow-md rounded-lg p-4 flex flex-col justify-between hover:shadow-xl transition-shadow duration-200"
            >
              <div>
                <h4 className="text-lg font-bold text-blue-600 mb-2">
                  {job.position}
                </h4>
                <p className="text-sm text-gray-700">Company: {job.company}</p>
                <p className="text-sm text-gray-700">Location: {job.joblocation}</p>
                <p className="text-sm">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      job.status === "applied"
                        ? "text-blue-500"
                        : job.status === "interview"
                        ? "text-yellow-500"
                        : job.status === "offer"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {job.status}
                  </span>
                </p>
                <p className="text-sm text-gray-700">Type: {job.type}</p>
                {job.notes && (
                  <p className="text-sm italic text-gray-500 mt-1">
                    Notes: {job.notes}
                  </p>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(job)}
                  className="flex-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="flex-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AddJob;