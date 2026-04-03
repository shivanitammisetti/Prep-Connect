import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllDoubts } from "../api/doubtAPI";
import { getAllVideos } from "../api/videoAPI";
import DashboardLayout from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const roadmaps = [
  { id: 1, title: "DSA", weeks: 12, topics: 48, progress: 62, color: "#EEEDFE", iconColor: "#534AB7" },
  { id: 2, title: "Web development", weeks: 16, topics: 60, progress: 30, color: "#E1F5EE", iconColor: "#0F6E56" },
  { id: 3, title: "Core subjects", weeks: 8, topics: 32, progress: 10, color: "#FAEEDA", iconColor: "#BA7517" },
];

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [doubts, setDoubts] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getAllDoubts().then((r) => setDoubts(r.data)).catch(() => {});
    getAllVideos().then((r) => setVideos(r.data)).catch(() => {});
  }, []);

  const feed = [
    ...doubts.map((d) => ({ ...d, type: "doubt" })),
    ...videos.map((v) => ({ ...v, type: "video" })),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const initials = (name) =>
    name ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "?";

  return (
    <DashboardLayout>
      <div className="welcome-bar">
        <div>
          <div className="welcome-text">Good morning, {user?.name?.split(" ")[0]} 👋</div>
          <div className="welcome-sub">
            {user?.role === "Alumni"
              ? `${doubts.filter(d => d.answers?.length === 0).length} unanswered doubts — help a student out`
              : "Keep going — consistency beats talent"}
          </div>
        </div>
        {user?.role === "Alumni" ? (
          <button className="cta-btn" onClick={() => navigate("/videos")}>+ Post video</button>
        ) : (
          <button className="cta-btn" onClick={() => navigate("/doubts")}>+ Ask doubt</button>
        )}
      </div>

      <div className="section-label">Learning roadmaps</div>
      <div className="roadmap-row">
        {roadmaps.map((r) => (
          <div className="rcard" key={r.id} onClick={() => navigate("/roadmaps")}>
            <div className="rcard-icon" style={{ background: r.color }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: r.iconColor }} />
            </div>
            <div className="rcard-title">{r.title}</div>
            <div className="rcard-sub">{r.weeks} weeks · {r.topics} topics</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${r.progress}%`, background: r.iconColor }} />
            </div>
          </div>
        ))}
      </div>

      <div className="section-label">Community feed</div>

      {feed.length === 0 && (
        <div className="empty-feed">No posts yet — be the first to contribute!</div>
      )}

      {feed.map((item) => (
        <div
          className="feed-card"
          key={item._id}
          onClick={() => navigate(item.type === "doubt" ? `/doubts/${item._id}` : `/videos/${item._id}`)}
        >
          <div className="feed-header">
            <div className="feed-av" style={{ background: item.type === "doubt" ? "#E1F5EE" : "#EEEDFE", color: item.type === "doubt" ? "#085041" : "#3C3489" }}>
              {initials(item.student?.name || item.postedBy?.name || "?")}
            </div>
            <div>
              <div className="feed-name">
                {item.student?.name || item.postedBy?.name || "Unknown"}
                <span className={`feed-tag ${item.type}`}>{item.type}</span>
              </div>
            </div>
            <div className="feed-time">{new Date(item.createdAt).toLocaleDateString()}</div>
          </div>
          <div className="feed-title">{item.title}</div>
          <div className="feed-body">{item.description?.slice(0, 120)}{item.description?.length > 120 ? "..." : ""}</div>
          <div className="feed-footer">
            <span className="feed-act">{item.type === "doubt" ? "View & answer" : "Watch video"}</span>
            <span className="feed-count">
              {item.type === "doubt" ? `${item.answers?.length || 0} answers` : `${item.comments?.length || 0} comments`}
            </span>
          </div>
        </div>
      ))}
    </DashboardLayout>
  );
};

export default Dashboard;