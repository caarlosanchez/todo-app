import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import SignUp from "./pages/sign-up/SignUp";
import SignUpAvatar from "./pages/sign-up-avatar/SignUpAvatar";
import NotFound from "./pages/not-found/NotFound";
import NavBar from "./components/shared/nav-bar/NavBar";
import DashboardPaginated from "./pages/dashboard-paginated/DashboardPaginated";
import DashboardSearch from "./pages/dashboard-search/DashboardSearch";
import Profile from "./pages/profile/Profile";
import Task from "./pages/task/Task";

import "./index.css";

function App() {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="paginated" element={<DashboardPaginated />} />
        <Route path="search" element={<DashboardSearch />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="avatar" element={<SignUpAvatar />} />
        <Route path="profile" element={<Profile />} />
        <Route path="task/:id" element={<Task />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
