import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/authAPI";
import { toast } from "react-toastify";
import "./Auth.css";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Student" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(form);
      toast.success("OTP sent to your email!");
      navigate("/verify-otp", { state: { email: form.email } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">Prep<span>Connect</span></div>
        <h2 className="auth-title">Create your account</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full name</label>
            <input name="name" placeholder="Rahul Kumar" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" placeholder="rahul@gmail.com" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" placeholder="Min 6 characters" value={form.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>I am a</label>
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="Student">Student</option>
              <option value="Alumni">Alumni</option>
            </select>
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Sending OTP..." : "Register & get OTP"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;