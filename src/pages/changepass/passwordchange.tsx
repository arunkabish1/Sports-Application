import React, { useState } from "react";
import { API_ENDPOINT } from "../../config/constants";

const PasswordForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [cPass, setCPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!cPass || !newPass) {
      setError("Please fill in all fields");
      return;
    }

    if (newPass.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (cPass === newPass) {
      setError("New password cannot be same as current password");
      return;
    }

    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch(`${API_ENDPOINT}/user/password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          current_password: cPass,
          new_password: newPass,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Password change failed");
      }

      console.log("Password change is successful");
      onClose();
    } catch (error) {
      setError(`${error}`);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-700">
            Change Password
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm">Current Password</label>
            <input
              type="password"
              value={cPass}
              onChange={(e) => setCPass(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-600"
              placeholder="Current Password"
            />
          </div>
          <div>
            <label className="block mt-4 text-sm">New Password</label>
            <input
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-600"
              placeholder="New Password"
            />
          </div>
          <div className="mt-4 grid grid-flow-col gap-1">
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-zinc-500 border border-transparent rounded-lg active:bg-zinc-600 hover:bg-zinc-600 focus:outline-none focus:shadow-outline-zinc"
            >
              Change Password
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-zinc-500 border border-transparent rounded-lg active:bg-zinc-600 hover:bg-zinc-600 focus:outline-none focus:shadow-outline-zinc"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
          {error && <div className="mt-4 text-red-500">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default PasswordForm;
