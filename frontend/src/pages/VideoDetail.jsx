import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVideoById, addComment } from "../api/videoAPI";
import DashboardLayout from "../components/DashboardLayout";
import { toast } from "react-toastify";
import "./DoubtDetail.css";

const VideoDetail = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { getVideoById(id).then((r) => setVideo(r.data)).catch(() => {}); }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await addComment(id, { text: comment });
      setVideo((prev) => ({ ...prev, comments: data }));
      setComment("");
      toast.success("Comment added!");
    } catch {
      toast.error("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  if (!video) return <DashboardLayout><div className="loading">Loading...</div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="detail-card">
        <div className="detail-tag video">Video</div>
        <h2 className="detail-title">{video.title}</h2>
        <div style={{ margin: "14px 0", borderRadius: 10, overflow: "hidden", background: "#EEEDFE", height: 280, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {video.videoURL?.includes("youtube") ? (
            <iframe
              width="100%" height="280"
              src={video.videoURL.replace("watch?v=", "embed/")}
              frameBorder="0" allowFullScreen title={video.title}
            />
          ) : (
            <a href={video.videoURL} target="_blank" rel="noreferrer" style={{ color: "#534AB7", fontSize: 14 }}>
              Open video link ↗
            </a>
          )}
        </div>
        <p className="detail-body">{video.description}</p>
        <div className="detail-meta">Posted by {video.postedBy?.name} · {new Date(video.createdAt).toLocaleDateString()}</div>
      </div>

      <div className="answers-section">
        <div className="section-label">{video.comments?.length || 0} comments</div>
        {video.comments?.map((c, i) => (
          <div className="answer-card" key={i}>
            <div className="answer-header">
              <div className="answer-av">{c.user?.name?.[0] || "U"}</div>
              <span className="answer-name">{c.user?.name || "User"}</span>
              <span className="answer-time">{new Date(c.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="answer-text">{c.text}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleComment} className="doubt-form">
        <div className="form-group">
          <label>Add a comment</label>
          <textarea rows={3} placeholder="Share your thoughts or ask a question..."
            value={comment} onChange={(e) => setComment(e.target.value)} required />
        </div>
        <button type="submit" className="cta-btn" disabled={loading}>
          {loading ? "Posting..." : "Post comment"}
        </button>
      </form>
    </DashboardLayout>
  );
};

export default VideoDetail;