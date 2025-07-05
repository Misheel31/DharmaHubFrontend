import axios from "axios";
import { Eye, EyeOff, Lock, Mail, Shield, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(
      data.password === data.confirmPassword || data.confirmPassword === ""
    );
  }, [data.password, data.confirmPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        data
      );

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Register successful!");

        navigate("/login");
      }
    } catch (error) {
      toast.error("An error occurred during registration");
    } finally {
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

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
            Create Your Account
          </h2>

          <form onSubmit={registerUser} className="space-y-6">
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="username"
                value={data.username}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 shadow-md focus:ring-2 focus:ring-rose-300 focus:outline-none"
                placeholder="Username"
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 shadow-md focus:ring-2 focus:ring-rose-300 focus:outline-none"
                placeholder="Email"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 shadow-md focus:ring-2 focus:ring-rose-300 focus:outline-none"
                placeholder="Password"
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

            <div className="relative">
              <Shield className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                  !passwordMatch && data.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } shadow-md focus:ring-2 focus:ring-rose-300 focus:outline-none`}
                placeholder="Confirm Password"
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

            {!passwordMatch && data.confirmPassword && (
              <p className="text-red-500 text-sm -mt-2">
                Passwords do not match
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 hover:from-pink-500 hover:to-orange-500 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 disabled:bg-gray-300 cursor-pointer"
              disabled={!passwordMatch || loading}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>

            <p className="text-center text-gray-700 text-sm">
              Already Have An Account?{" "}
              <Link
                to="/login"
                className="text-pink-600 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
