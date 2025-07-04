import axios from "axios";
import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/AuthContext";

const LoginPage = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // get login function from context

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        data
      );
      console.log("Login Response:", response.data);

      if (response.data.token) {
        const { token, user } = response.data;

        // Save to context & localStorage
        login(token, user.username, user._id);

        setSuccess("Login Successful!");
        setLoading(false);

        // Redirect based on user role from backend, not form data
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          toast.success("Login successful!");
          navigate("/home");
        }
      } else {
        setError("Invalid response from server.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Login Error:", err.response?.data || err);
      setError(err.response?.data?.error || "Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 via-rose-200 to-orange-100 px-4 py-10">
      <div className="flex w-full max-w-5xl bg-white/30 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white/40">
        {/* Left Image Section */}
        <div className="hidden md:block w-1/2 relative">
          <img
            src="../src/assets/register (2).png"
            alt="Boudhanath"
            className="h-full w-full object-cover transform scale-110"
            style={{
              clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
            }}
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-800 text-center">
            Welcome Back!
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Discover Buddhist teachings and events
          </p>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && (
            <div className="bg-green-100 text-green-700 border border-green-400 px-4 py-2 rounded text-center mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-gray-400 w-4 h-6" />
              <input
                type="email"
                placeholder="Email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              <input
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
              />
            </div>

            <div className="text-right text-sm">
              <a
                href="/forgot-password"
                className="text-gray-600 hover:text-orange-500"
              >
                Forget password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-400 to-pink-500 hover:from-pink-500 hover:to-orange-600 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 cursor-pointer"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-gray-700 text-sm">
              Don’t Have An Account?{" "}
              <a
                href="/register"
                className="text-purple-600 font-semibold hover:underline"
              >
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
