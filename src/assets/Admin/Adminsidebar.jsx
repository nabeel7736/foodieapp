import React, { useContext, useState } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { FaHome, FaBoxOpen, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { StoreContext } from "../storecontext/Storecontext";
import { IoFastFoodSharp } from "react-icons/io5";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const {user,setUser} =useContext(StoreContext)

  const handleLogout = (e) => {
    e.preventDefault();
    console.log("Logout clicked");
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("user");
      localStorage.removeItem("isAdmin");
      setUser(null);
      navigate("/login");
    }
  };

  return (
  <div className="flex h-screen">
      <aside className="w-64 bg-gray-900 text-white flex flex-col fixed top-0 left-0 h-full shadow-lg">
        <div className="px-6 py-5 border-b border-gray-700">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="mt-2 text-sm text-gray-300"> {user?.name || "Admin"}</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? "bg-amber-500 text-black" : "text-amber-300 hover:bg-gray-800"
              }`
            }
          >
            <FaHome /> Dashboard
          </NavLink>

          <NavLink
            to="menu"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? "bg-amber-500 text-black" : "text-amber-300 hover:bg-gray-800"
              }`
            }
          >
            <IoFastFoodSharp /> Dishes
          </NavLink>

          <NavLink
            to="users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? "bg-amber-500 text-black" : "text-amber-300 hover:bg-gray-800"
              }`
            }
          >
            <FaUsers /> Users
          </NavLink>
        </nav>

        <button
        type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 mt-auto bg-red-600 hover:bg-red-700 text-white transition-colors w-full text-left"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>
      <main className="flex-1 ml-64 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminSidebar;
