import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";

const SignupForm: React.FC = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [pass, setpass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!Name || !Email || !pass) {
      setError("Please fill in all fields");
      return;
    }

    const emailcontains = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailcontains.test(Email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      const response = await fetch(`${API_ENDPOINT}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: Name,
          email: Email,
          password: pass,
        }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      }

      console.log("Sign-up is successful");
      const data = await response.json();
      localStorage.setItem("authToken", data.auth_token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      navigate("/scorepanel");
    } catch (error) {
      setError(`Sign-up failed: ${error}`);
    }
  };

  return (
    <div className="flex items-center min-h-screen bg-[#c7e3e2]">
      <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
        <div className="flex flex-col md:flex-row">
          <div className="h-32 flex flex-col justify-center gap-10 md:h-auto md:w-1/2">
            <h1 className="text-2xl  font-bold text-center text-gray-700">
              Welcome to ScoreChecker
            </h1>
            <a
              className="text-center rounded-md font-bold text-black hover:text-gray-900"
              href="scorepanel"
            >
             <p className="text-center  font-bold text-gray-500">
             Want to Continue Without Signin click here
              </p> 
              Get live score Now !
            </a>

            <p className="text-center font-bold text-gray-500">
              With ScoreChecker, you can track your personalized favorite sports
              and get live score
            </p>
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <div className="flex justify-center"></div>
              <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                Sign up
              </h1>
              <form onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm">Name</label>
                  <input
                    type="text"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 text-sm border rounded-md focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                    placeholder="Name"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm">Email</label>
                  <input
                    type="email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 text-sm border rounded-md focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                    placeholder="Email Address"
                  />
                </div>
                <div>
                  <label className="block mt-4 text-sm">Password</label>
                  <input
                    type="password"
                    value={pass}
                    onChange={(e) => setpass(e.target.value)}
                    className="w-full px-4 py-2 text-sm border rounded-md focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                    placeholder="Password"
                  />
                </div>
                <button
                  type="submit"
                  className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-zinc-900 transition-colors duration-150 bg-[#c7e3e2] border border-transparent rounded-lg active:bg-zinc
                  -600 hover:bg-zinc-700 focus:outline-none focus:shadow-outline-zinc"
                >
                  Sign Up Now
                </button>
              </form>
              <div className="mt-4 text-center">
                <p className="text-sm">
                  Don't have an account yet?
                  <a
                    href="signin"
                    className="ml-1 text-zinc-600 hover:underline"
                  >
                    Sign in.
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
