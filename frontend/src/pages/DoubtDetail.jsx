import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoubtById, answerDoubt } from "../api/doubtAPI";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../components/DashboardLayout";
import { toast } from "react-toastify";
import "./DoubtDetail.css";

const DoubtDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [doubt, setDoubt] = useState(null);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { getDoubtById(id).then((r) => setDoubt(r.data)).catch(() => {}); }, [id]);

  const handleAnswer = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await answerDoubt(id, { text: answer });
      setDoubt(data);
      setAnswer("");
      toast.success("Answer posted!");
    } catch {
      toast.error("Failed to post answer");
    } finally {
      setLoading(false);
    }
  };

  if (!doubt) return <DashboardLayout><div className="loading">Loading...</div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="detail-card">
        <div className="detail-tag doubt">Doubt</div>
        <h2 className="detail-title">{doubt.title}</h2>
        <p className="detail-body">{doubt.description}</p>
        <div className="detail-meta">Asked by {doubt.student?.name} · {new Date(doubt.createdAt).toLocaleDateString()}</div>
      </div>

      <div className="answers-section">
        <div className="section-label">{doubt.answers?.length || 0} answers</div>
        {doubt.answers?.map((a, i) => (
          <div className="answer-card" key={i}>
            <div className="answer-header">
              <div className="answer-av">{a.alumni?.name?.[0] || "A"}</div>
              <span className="answer-name">{a.alumni?.name || "Alumni"}</span>
              <span className="answer-time">{new Date(a.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="answer-text">{a.text}</div>
          </div>
        ))}
      </div>

      {user?.role === "Alumni" && (
        <form onSubmit={handleAnswer} className="doubt-form">
          <div className="form-group">
            <label>Your answer</label>
            <textarea rows={4} placeholder="Write a helpful answer..."
              value={answer} onChange={(e) => setAnswer(e.target.value)} required />
          </div>
          <button type="submit" className="cta-btn" disabled={loading}>
            {loading ? "Posting..." : "Submit answer"}
          </button>
        </form>
      )}
    </DashboardLayout>
  );
};

export default DoubtDetail;