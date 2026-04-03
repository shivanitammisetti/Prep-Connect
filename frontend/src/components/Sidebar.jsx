import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard, Map, HelpCircle, Video, User, LogOut
} from "lucide-react";
import "./Sidebar.css";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "??";

  return (
    <div className="sidebar">
      <div className="sidebar-profile">
        <div className="avatar-lg">{initials}</div>
        <div className="profile-name">{user?.name}</div>
        <span className={`role-badge ${user?.role === "Alumni" ? "alumni" : "student"}`}>
          {user?.role}
        </span>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <LayoutDashboard size={16} /> Dashboard
        </NavLink>
        <NavLink to="/roadmaps" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Map size={16} /> Roadmaps
        </NavLink>
        <NavLink to="/doubts" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <HelpCircle size={16} /> My doubts
        </NavLink>
        <NavLink to="/videos" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Video size={16} /> Video library
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <User size={16} /> Profile
        </NavLink>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        <LogOut size={16} /> Logout
      </button>
    </div>
  );
};

export default Sidebar;