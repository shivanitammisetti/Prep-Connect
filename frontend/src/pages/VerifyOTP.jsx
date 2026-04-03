import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOTP } from "../api/authAPI";
import { toast } from "react-toastify";
import "./Auth.css";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email || "";

  const ref0 = useRef(); const ref1 = useRef();
  const ref2 = useRef(); const ref3 = useRef();
  const ref4 = useRef(); const ref5 = useRef();
  const refs = [ref0, ref1, ref2, ref3, ref4, ref5];

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) refs[i + 1].current.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) refs[i - 1].current.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) return toast.error("Enter all 6 digits");
    setLoading(true);
    try {
      await verifyOTP({ email, otp: code });
      toast.success("Account verified! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">Prep<span>Connect</span></div>
        <h2 className="auth-title">Verify your email</h2>
        <p className="auth-sub">OTP sent to <strong>{email}</strong></p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="otp-row">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={refs[i]}
                className="otp-box"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
              />
            ))}
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;