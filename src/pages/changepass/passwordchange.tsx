import React, { useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";

const PasswordForm: React.FC = () => {
  const [cPass, setCPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!cPass || !newPass) {
      setError("Must be filled in all fields");
      return;
    }

    console.log(cPass);
    console.log(newPass);
    const authToken = localStorage.getItem("authToken");
    // console.log(authToken)
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
        throw new Error("response!ok");
      }

      console.log("successful");
      navigate("/scorepanel");
    } catch (error) {
      setError(`failed: ${error}`);
    }
  };

  return (
    <div className="border  rounded-lg bg-[#f5f5f5] w-1/4 py-10  px-20 mx-auto">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-zinc-700 font-semibold mb-2">
            Current Password:
          </label>
          <input
            type="password"
            value={cPass}
            onChange={(e) => setCPass(e.target.value)}
            className="w-full border rounded-md py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:border-zinc-500 focus:shadow-outline-blue"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            New Password:
          </label>
          <input
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            className="w-full border rounded-md py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:border-zinc-500 focus:shadow-outline-blue"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#c7e3e2] hover:bg-[#7c8a8a] text-black font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue mt-4"
        >
          Change Password
        </button>
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  );
};

export default PasswordForm;
