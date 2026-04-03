import DashboardLayout from "../components/DashboardLayout";
import "./Roadmaps.css";

const roadmaps = [
  {
    id: 1, title: "Data Structures & Algorithms", weeks: 12, color: "#EEEDFE", accent: "#534AB7",
    topics: ["Arrays & Strings", "Linked Lists", "Stacks & Queues", "Trees & BST", "Graphs", "Dynamic Programming", "Recursion & Backtracking", "Sorting & Searching"],
  },
  {
    id: 2, title: "Full Stack Web Development", weeks: 16, color: "#E1F5EE", accent: "#0F6E56",
    topics: ["HTML & CSS Basics", "JavaScript ES6+", "React.js", "Node.js & Express", "MongoDB", "REST APIs", "Authentication (JWT)", "Deployment"],
  },
  {
    id: 3, title: "Core Subjects", weeks: 8, color: "#FAEEDA", accent: "#BA7517",
    topics: ["Operating Systems", "DBMS", "Computer Networks", "OOP Concepts", "System Design Basics", "SQL Queries"],
  },
];

const Roadmaps = () => (
  <DashboardLayout>
    <div className="page-header">
      <div className="page-title">Learning roadmaps</div>
    </div>

    {roadmaps.map((r) => (
      <div className="roadmap-full" key={r.id}>
        <div className="rm-header" style={{ background: r.color }}>
          <div className="rm-title" style={{ color: r.accent }}>{r.title}</div>
          <div className="rm-weeks" style={{ color: r.accent }}>{r.weeks} weeks</div>
        </div>
        <div className="rm-topics">
          {r.topics.map((t, i) => (
            <div className="rm-topic" key={i}>
              <div className="rm-num" style={{ background: r.color, color: r.accent }}>{i + 1}</div>
              {t}
            </div>
          ))}
        </div>
      </div>
    ))}
  </DashboardLayout>
);

export default Roadmaps;