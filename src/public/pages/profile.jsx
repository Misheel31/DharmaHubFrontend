import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Header from "../../components/Navbar";

const Profile = () => {
  const navigate = useNavigate();
  const { username, updateUsername, _id } = useAuth();

  const [formData, setFormData] = useState({ username: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!_id) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:3000/api/user/${_id}`)
      .then((res) => {
        if (!res.ok) throw new Error("User not found");
        return res.json();
      })
      .then((data) => {
        setFormData({ username: data.username || "" });
      })
      .catch((err) => {
        console.error("Failed to fetch user data", err);
      })
      .finally(() => setLoading(false));
  }, [_id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/user/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: formData.username }),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const data = await res.json();
      updateUsername(data.user.username);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("An error occurred while updating your profile.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#f5eded] px-6 py-12 pt-28">
        <div className="max-w-xl mx-auto bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Name</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
