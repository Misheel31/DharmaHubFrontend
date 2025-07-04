import {
  FaBloggerB,
  FaBookOpen,
  FaFacebookF,
  FaGavel,
  FaHome,
  FaInfoCircle,
  FaInstagram,
  FaRegFileAlt,
} from "react-icons/fa";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#E8E1DC] text-center text-sm py-8 border-t border-gray-300">
      {/* Logo + Title Block Centered */}
      <div className="flex flex-col items-center justify-center mb-6 px-4">
        <img
          src={logo}
          alt="Logo"
          className="h-16 w-16 object-cover rounded-full mb-2"
        />
        <div className="text-center">
          <p className="font-bold text-lg">The Dharma Hub</p>
          <p className="text-gray-600 mt-1">
            Sharing the path of mindfulness and compassion with the world.
          </p>
        </div>
      </div>

      {/* Footer Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto text-left text-sm">
        <div className="text-center sm:text-left">
          <p className="font-semibold mb-2">Quick Links</p>
          <ul className="text-gray-600 space-y-2">
            <li className="flex items-center gap-2">
              <FaHome />
              <a href="/home">Home</a>
            </li>
            <li className="flex items-center gap-2">
              <FaInfoCircle />
              <a href="/about">About</a>
            </li>
            <li className="flex items-center gap-2">
              <FaBloggerB />
              <a href="/blog">Blog</a>
            </li>
            <li className="flex items-center gap-2">
              <FaBookOpen />
              <a href="/books">Books</a>
            </li>
          </ul>
        </div>

        <div className="text-center">
          <p className="font-semibold mb-2">Connect</p>
          <ul className="text-gray-600 space-y-2">
            <li className="flex items-center justify-center gap-2">
              <FaFacebookF />
              <a href="#">Facebook</a>
            </li>
            <li className="flex items-center justify-center gap-2">
              <FaInstagram />
              <a href="#">Instagram</a>
            </li>
          </ul>
        </div>

        <div className="text-center sm:text-right">
          <p className="font-semibold mb-2">Legal</p>
          <ul className="text-gray-600 space-y-2 sm:items-end sm:text-right">
            <li className="flex items-center gap-2 justify-center sm:justify-end">
              <FaRegFileAlt />
              <a href="#">Privacy Policy</a>
            </li>
            <li className="flex items-center gap-2 justify-center sm:justify-end">
              <FaGavel />
              <a href="#">Terms of Use</a>
            </li>
          </ul>
        </div>
      </div>

      <p className="mt-8 text-gray-500">© 2025 The Dharma Hub</p>
    </footer>
  );
}
