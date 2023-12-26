import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(username, password);

    // db.get('login').then((doc) => {
    //     console.log(doc);
    // });
    try {
      if (username === "_onflow" && password === "_onflow123") {
        toast.success("Login Successful");
        navigate("/home/invoices");
      } else {
        toast.error("Wrong Credentials");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 className="font-bold text-4xl text-gray-800 mb-6">Welcome Back</h1>
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col mb-4">
                <label htmlFor="username" className="text-gray-600 mb-2">Username</label>
                <input
                    id="username"
                    className="w-full border-2 border-gray-300 rounded-sm p-3 focus:outline-none focus:ring focus:border-blue-300 placeholder-gray-500"
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Enter your username"
                    required
                />
            </div>
            <div className="flex flex-col mb-4">
                <label htmlFor="password" className="text-gray-600 mb-2">Password</label>
                <input
                    id="password"
                    className="w-full border-2 border-gray-300 rounded-sm p-3 focus:outline-none focus:ring focus:border-blue-300 placeholder-gray-500"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter your password"
                    required
                />
            </div>
            <div className="flex items-center justify-center mt-6">
                <button className="bg-[#60AFF8] text-white w-full p-3 rounded-md font-semibold text-xl hover:bg-blue-600 transition duration-300">
                    Sign In
                </button>
            </div>
        </form>
    </div>
</div>


  );
};

export default Login;
