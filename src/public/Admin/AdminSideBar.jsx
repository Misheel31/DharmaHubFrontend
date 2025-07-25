import {
  FaBook,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUpload,
  FaUsers,
} from "react-icons/fa";

const AdminSidebar = ({ isOpen = true, onClose }) => {
  const menuItems = [
    { icon: FaTachometerAlt, label: "Dashboard", path: "/admin" },
    { icon: FaUpload, label: "Upload Blog", path: "/blogs" },
    { icon: FaUsers, label: "Users", path: "/users" },
    { icon: FaBook, label: "Event List", path: "/EventList" },
    { icon: FaUpload, label: "Create Event", path: "/createEvent" },
    { icon: FaBook, label: "Upload Book", path: "/uploadBooks" },
    { icon: FaSignOutAlt, label: "Logout", path: "/landing-page" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-64 
        bg-gradient-to-b from-gray-900 to-gray-800 
        text-gray-100 shadow-lg 
        transform transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
            The Dharma Hub
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <a
                  href={item.path}
                  className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 group"
                >
                  <Icon className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
