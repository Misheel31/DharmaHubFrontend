import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function Header() {
  const { isLoggedIn, username, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(
      "Navbar Rendered - isLoggedIn:",
      isLoggedIn,
      "Username:",
      username
    );
  }, [isLoggedIn, username]);

  return (
    <>
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-[#f7ebeb] shadow-md">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/home" className="flex items-center gap-2">
            <img
              src="../src/assets/logo.png"
              alt="The Dharma Hub"
              className="h-10 w-10 rounded-full"
            />
            <span className="text-lg font-bold">The Dharma Hub</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-6 flex items-center">
          <Link to="/home" className="hover:text-orange-600">
            Home
          </Link>
          <Link to="/about" className="hover:text-orange-600">
            About
          </Link>
          <Link to="/blog" className="hover:text-orange-600">
            Blog
          </Link>
          <Link to="/books" className="hover:text-orange-600">
            Books
          </Link>
          <Link to="/audio" className="hover:text-orange-600">
            Audio
          </Link>

          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 text-gray-800 font-semibold hover:text-orange-600 focus:outline-none"
              >
                <FaUserCircle size={22} />
                <span>{username}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/profile");
                    }}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                  >
                    Edit Profile
                  </button>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/wishlist");
                    }}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                  >
                    Wishlist
                  </button>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/joined-events");
                    }}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                  >
                    Event
                  </button>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      setShowLogoutModal(true);
                    }}
                    className="block px-4 py-2 text-gray-800 hover:bg-red-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </nav>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm text-center">
            <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-6 text-gray-700">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  logout();
                  setShowLogoutModal(false);
                  navigate("/landing-page");
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
