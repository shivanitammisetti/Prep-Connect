import Sidebar from "./Sidebar";
import RightPanel from "./RightPanel";
import "./DashboardLayout.css";

const DashboardLayout = ({ children }) => {
  return (
    <div className="layout">
      <div className="layout-topbar">
        <div className="topbar-logo">Prep<span>Connect</span></div>
        <div className="topbar-search">Search roadmaps, doubts, videos...</div>
      </div>
      <div className="layout-body">
        <Sidebar />
        <main className="layout-main">{children}</main>
        <RightPanel />
      </div>
    </div>
  );
};

export default DashboardLayout;