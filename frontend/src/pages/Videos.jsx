import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllVideos, uploadVideo } from "../api/videoAPI";
import DashboardLayout from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Videos.css";

const Videos = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", videoURL: "", category: "DSA" });
  const [loading, setLoading] = useState(false);

  useEffect(() => { getAllVideos().then((r) => setVideos(r.data)).catch(() => {}); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await uploadVideo(form);
      setVideos([data, ...videos]);
      setForm({ title: "", description: "", videoURL: "", category: "DSA" });
      setShowForm(false);
      toast.success("Video posted!");
    } catch {
      toast.error("Failed to post video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="page-title">Video library</div>
        {user?.role === "Alumni" && (
          <button className="cta-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "+ Post video"}
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="doubt-form">
          <div className="form-group">
            <label>Title</label>
            <input placeholder="e.g. Binary Search — all patterns" value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea rows={3} placeholder="What does this video cover?"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Video URL (YouTube / Drive link)</label>
            <input placeholder="https://youtube.com/..." value={form.videoURL}
              onChange={(e) => setForm({ ...form, videoURL: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              <option>DSA</option>
              <option>Web Development</option>
              <option>Core Subjects</option>
              <option>Interview Tips</option>
            </select>
          </div>
          <button type="submit" className="cta-btn" disabled={loading}>
            {loading ? "Posting..." : "Post video"}
          </button>
        </form>
      )}

      <div className="video-grid">
        {videos.map((v) => (
          <div className="video-card" key={v._id} onClick={() => navigate(`/videos/${v._id}`)}>
            <div className="video-thumb">
              <div className="play-icon">▶</div>
            </div>
            <div className="video-info">
              <span className="video-cat">{v.category}</span>
              <div className="video-title">{v.title}</div>
              <div className="video-by">by {v.postedBy?.name || "Alumni"}</div>
              <div className="video-stats">{v.comments?.length || 0} comments</div>
            </div>
          </div>
        ))}
      </div>

      {videos.length === 0 && (
        <div className="empty-feed">No videos yet. Alumni — share your knowledge!</div>
      )}
    </DashboardLayout>
  );
};

export default Videos;