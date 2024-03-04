import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";

const PasswordForm: React.FC = () => {
  const [cPass, setCPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!cPass || !newPass) {
      setError("Please fill in all fields");
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
      navigate("/scorepanel");
    } catch (error) {
      setError(`Password change failed: ${error}`);
    }
  };

  return (
    <div className="flex items-center min-h-screen bg-[#c7e3e2]">
      <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-center p-6 sm:p-12">
          <div className="w-full">
            <div className="flex justify-center">
              <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
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
              <button
                type="submit"
                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-zinc-900 transition-colors duration-150 bg-[#c7e3e2] border border-transparent rounded-lg active:bg-zinc-600 hover:bg-zinc-700 focus:outline-none focus:shadow-outline-zinc"
              >
                Change Password
              </button>
            </form>
            {error && <div className="mt-4 text-red-500">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordForm;
