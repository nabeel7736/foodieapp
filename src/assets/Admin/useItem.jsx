// UserItem.jsx
import React from "react";
import { useNavigate } from "react-router-dom";


const UserItem = React.memo(({ user, onDelete, onToggleBlock }) => {
  console.log(`Rendering user: ${user.name}`); 
  const navigate =useNavigate()

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col md:flex-row justify-between items-center">
      <div className="mb-4 md:mb-0 w-full md:w-2/3">
        <p className="text-lg font-medium">Name: {user.name}</p>
        <p className="text-sm text-gray-400">Email: {user.email}</p>
        <p className={`text-sm mt-1 font-semibold ${user.status === "active" ? "text-green-400" : "text-red-400"}`}>
          Status: {user.status}
        </p>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => navigate(`/admin/user/${user.id}`)}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded shadow"
        >
          View
        </button>
        <button
          type="button"
          onClick={() => onToggleBlock(user.id, user.status)}
          className={`px-4 py-2 ${
            user.status === "active" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
          } text-white font-medium rounded shadow`}
        >
          {user.status === "active" ? "Block" : "Unblock"}
        </button>
        <button
          type="button"
          onClick={() => onDelete(user.id)}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded shadow"
        >
          Delete
        </button>
      </div>
    </div>
  );
});

export default UserItem;