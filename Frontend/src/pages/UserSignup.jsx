import { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance.js";
import { useAuth } from "../context/AuthContext.jsx";
import {toast} from "react-toastify"

const UserSignup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useAuth()

  let navigate = useNavigate();

  let submitHandler = async (e) => {
    e.preventDefault();

    let userData = {
      name: name,
      email: email,
      password: password
    }
    
    try {
    let response = await axiosInstance.post(`/user/createuser`, userData, {
      withCredentials: true
    })
      if (response.status === 200) {
        let data = response.data      
        localStorage.setItem("userToken", data.token);
        setUser(data.user);        
        toast.success(data.message)
        setName("");
        setEmail("");
        setPassword("");
        navigate("/");
        
      }

    } catch (error) {
      console.log("error = ", error.response);
      toast.error(error.response.data.message)
      setName("");
      setEmail("");
      setPassword("");
    }

  }



  return (
    <div className="fixed w-full min-h-screen bg-gray-100 px-4">

      {/* Admin Login Button (Subtle & Matching) */}
      <div className="max-w-md mx-auto pt-2 flex justify-end">
        <Link to="/adminlogin">
          <button
            type="button"
            className="border border-gray-300 cursor-pointer text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
          >
            Admin Login
          </button>
        </Link>
      </div>

      {/* Signup Card */}
      <div className="flex items-center justify-center mt-0.5">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">

          {/* Heading */}
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Create Account
          </h2>

          {/* Form */}
          <form className="space-y-4" onSubmit={(e) => {
            submitHandler(e)
          }}>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>

            {/* Create Button */}
            <button
              type="submit"
              className="w-full bg-green-600 cursor-pointer text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Create Account
            </button>
          </form>

          {/* Login Redirect */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              to="/userlogin"
              className="text-green-600 font-medium hover:underline"
            >
              Login now
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default UserSignup;
