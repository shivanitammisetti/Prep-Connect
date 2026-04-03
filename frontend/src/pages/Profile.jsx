import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../api/userAPI";
import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "./Profile.css";

const Profile = () => {
  const { user, login } = useAuth();
  const [form, setForm] = useState({ name: "", bio: "", phoneNumber: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProfile().then((r) => {
      setForm({ name: r.data.name || "", bio: r.data.bio || "", phoneNumber: r.data.phoneNumber || "" });
    }).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await updateProfile(form);
      login({ ...user, name: data.name });
      toast.success("Profile updated!");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "??";

  return (
    <DashboardLayout>
      <div className="profile-page">
        <div className="profile-top">
          <div className="profile-av-lg">{initials}</div>
          <div>
            <div className="profile-nm">{user?.name}</div>
            <span className={`role-badge ${user?.role === "Alumni" ? "alumni" : "student"}`}>
              {user?.role}
            </span>
            <div className="profile-email">{user?.email}</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="doubt-form">
          <div className="form-group">
            <label>Full name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Bio</label>
            <textarea rows={3} placeholder="e.g. Software Engineer at Google | IIT Delhi 2022"
              value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Phone number</label>
            <input placeholder="+91 98765 43210" value={form.phoneNumber}
              onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} />
          </div>
          <button type="submit" className="cta-btn" disabled={loading}>
            {loading ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Profile;