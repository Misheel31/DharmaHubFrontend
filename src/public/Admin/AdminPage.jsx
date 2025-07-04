import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSideBar";

const AdminPage = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const dashboardItems = [
    {
      title: "Manage Users",
      description: "View, edit or remove user accounts.",
      link: "/users",
    },
    {
      title: "Manage Blogs",
      description: "Create, update or delete blog posts.",
      link: "/blogs",
    },
    {
      title: "Manage Events",
      description: "Oversee upcoming Buddhist events.",
      link: "/EventList",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F9F3F3]">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 ml-64 py-12 px-6 sm:px-12">
        <h1 className="text-3xl font-bold text-[#BB5288] mb-10 text-center">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {dashboardItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.link)}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer transition-transform duration-300 hover:scale-[1.03]"
            >
              <h2 className="text-xl font-semibold text-[#BB5288] mb-2">
                {item.title}
              </h2>
              <p className="text-gray-700 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
