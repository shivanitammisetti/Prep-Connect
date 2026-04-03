import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllDoubts, createDoubt } from "../api/doubtAPI";
import DashboardLayout from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Doubts.css";

const Doubts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [doubts, setDoubts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => { getAllDoubts().then((r) => setDoubts(r.data)).catch(() => {}); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await createDoubt(form);
      setDoubts([data, ...doubts]);
      setForm({ title: "", description: "" });
      setShowForm(false);
      toast.success("Doubt posted!");
    } catch {
      toast.error("Failed to post doubt");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="page-title">Doubts</div>
        {user?.role === "Student" && (
          <button className="cta-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "+ Ask a doubt"}
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="doubt-form">
          <div className="form-group">
            <label>Question title</label>
            <input placeholder="e.g. How to solve DP problems?" value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea rows={4} placeholder="Describe your doubt in detail..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          </div>
          <button type="submit" className="cta-btn" disabled={loading}>
            {loading ? "Posting..." : "Post doubt"}
          </button>
        </form>
      )}

      {doubts.map((d) => (
        <div className="doubt-card" key={d._id} onClick={() => navigate(`/doubts/${d._id}`)}>
          <div className="doubt-title">{d.title}</div>
          <div className="doubt-body">{d.description?.slice(0, 100)}...</div>
          <div className="doubt-meta">
            <span>{d.student?.name || "Student"}</span>
            <span>{d.answers?.length || 0} answers</span>
          </div>
        </div>
      ))}

      {doubts.length === 0 && (
        <div className="empty-feed">No doubts yet. Be the first to ask!</div>
      )}
    </DashboardLayout>
  );
};

export default Doubts;