import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AdminPage from "./public/Admin/AdminPage";
import BlogUpload from "./public/Admin/BlogPage";
import CreateEvent from "./public/Admin/CreateEvent";
import EventList from "./public/Admin/EventList";
import CreateBookPage from "./public/Admin/UploadBook";
import UserList from "./public/Admin/UserList";
import About from "./public/pages/About";
import AddBlogPage from "./public/pages/AddBlog";
import Audio from "./public/pages/Audio";
import BlogPage from "./public/pages/Blog";
import BlogDetailPage from "./public/pages/BlogDetail";
import Bookcards from "./public/pages/Book";
import BookDetailPage from "./public/pages/BookDetail";
import Dharma from "./public/pages/Dharma";
import DharmaDetail from "./public/pages/DharmaDetail";
import Event from "./public/pages/Event";
import EventDetail from "./public/pages/EventDetail";
import Festival from "./public/pages/festival";
import FestivalDetail from "./public/pages/festivalDetail";
import Homepage from "./public/pages/Homepage";
import JoinedEvents from "./public/pages/JoinedEvents";
import LandingPage from "./public/pages/LandingPage";
import LoginPage from "./public/pages/Login";
import Profile from "./public/pages/profile";
import RegisterPage from "./public/pages/Register";
import SplashScreen from "./public/pages/splashScreen";
import ForgotPassword from "./public/pages/UserForgetPassword";
import ResetPassword from "./public/pages/UserResetPassword";
import Wishlist from "./public/pages/wishlist";

const App = () => {
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={2000} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/festival" element={<Festival />} />
          <Route path="/about" element={<About />} />
          <Route path="/festival/:id" element={<FestivalDetail />} />
          <Route path="/learnthedharma" element={<Dharma />} />
          <Route path="/audio" element={<Audio />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/add-blog" element={<AddBlogPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/events" element={<Event />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/joined-events" element={<JoinedEvents />} />
          <Route path="/books" element={<Bookcards />} />
          <Route path="/dharma/:topicId" element={<DharmaDetail />} />
          <Route path="/books/:id" element={<BookDetailPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/blogs" element={<BlogUpload />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/EventList" element={<EventList />} />
          <Route path="/createEvent" element={<CreateEvent />} />
          <Route path="/uploadbooks" element={<CreateBookPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/resetpassword/:id" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
