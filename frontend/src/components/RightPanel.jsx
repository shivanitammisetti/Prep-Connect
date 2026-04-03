import { useAuth } from "../context/AuthContext";
import "./RightPanel.css";

const tips = [
  "Always clarify constraints before coding in interviews.",
  "Think out loud — interviewers want to see your thought process.",
  "Practice explaining your solution before optimizing it.",
  "Start with brute force, then improve step by step.",
];

const RightPanel = () => {
  const { user } = useAuth();
  const tip = tips[new Date().getDay() % tips.length];

  return (
    <div className="right-panel">
      <div className="rp-section">
        <div className="rp-title">Tip of the day</div>
        <div className="tip-card">{tip}</div>
      </div>

      <div className="rp-section">
        <div className="rp-title">Quick actions</div>
        {user?.role === "Alumni" ? (
          <button className="qbtn primary" onClick={() => window.location.href = "/videos"}>
            + Post video
          </button>
        ) : (
          <button className="qbtn primary" onClick={() => window.location.href = "/doubts"}>
            + Ask a doubt
          </button>
        )}
        <button className="qbtn" onClick={() => window.location.href = "/roadmaps"}>
          Browse roadmaps
        </button>
      </div>

      <div className="rp-section">
        <div className="rp-title">Your role</div>
        <div className="role-info">
          {user?.role === "Alumni"
            ? "You can answer doubts and post tutorial videos."
            : "You can ask doubts and follow learning roadmaps."}
        </div>
      </div>
    </div>
  );
};

export default RightPanel;