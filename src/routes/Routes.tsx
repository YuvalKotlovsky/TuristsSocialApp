import AppLayout from "@/functions/layout/AppLayout";
import Login from "@/functions/pages/Login";
import Profile from "@/functions/pages/Profile";
import Register from "@/functions/pages/Register";
import { Routes, Route } from "react-router-dom";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<AppLayout />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
