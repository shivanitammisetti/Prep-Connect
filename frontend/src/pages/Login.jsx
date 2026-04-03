import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/authAPI";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "./Auth.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await loginUser(form);
      login(data);
      toast.success(`Welcome back, ${data.name}!`);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">Prep<span>Connect</span></div>
        <h2 className="auth-title">Welcome back</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" placeholder="rahul@gmail.com" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" placeholder="Your password" value={form.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-switch">
          No account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;