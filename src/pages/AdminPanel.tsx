import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import React from "react";

const AdminPanel = () => {
  return (
    <div className="h-full min-h-[calc(100vh-120px)] w-full md:flex hidden">
      <aside className="w-52 bg-white custom-shadow">
        <Sidebar />
      </aside>
      <main className="p-4 min-w-[calc(100%-210px)] mt-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
