// src/components/Layout.jsx
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <Navbar />
      {/* This is where the page content will render */}
      <Outlet />
    </div>
  );
}
