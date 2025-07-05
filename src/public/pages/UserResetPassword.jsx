import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      setError("Email not found. Please start from Forgot Password.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is missing. Please start from Forgot Password.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/resetpassword",
        {
          email,
          otp,
          newPassword,
        }
      );

      if (response.data.success) {
        setSuccessMessage(response.data.success);
        setError("");
        localStorage.removeItem("resetEmail");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else if (response.data.error) {
        setError(response.data.error);
        setSuccessMessage("");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h4 className="text-2xl font-semibold text-center mb-4">
          Reset Password
        </h4>
        {error && (
          <div className="text-red-500 text-sm text-center mb-4">{error}</div>
        )}
        {successMessage && (
          <div className="text-green-500 text-sm text-center mb-4">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mb-4 w-full p-3 border border-gray-300 rounded-md"
            required
          />

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 pr-10 border border-gray-300 rounded-md"
              required
            />
            <div
              className="absolute right-3 top-3.5 cursor-pointer text-gray-500 hover:text-orange-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
