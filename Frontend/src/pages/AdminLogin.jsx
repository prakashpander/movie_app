import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

const AdminLogin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { admin, setAdmin } = useAuth();
  let navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    let adminData = {
      email: email,
      password: password
    }

    try {
      let response = await axiosInstance.post("/admin/loginadmin", adminData,
        {
          withCredentials: true
        });
      if (response.status === 200) {
        let data = response.data;
        setAdmin(data.user);
        localStorage.setItem("adminToken", data.token)
        toast.success(data.message);
        setEmail('');
        setPassword('');
        navigate("/admin")
      }

    } catch (error) {
      console.log("error = ", error.response);
      toast.error(error.response?.data.message);
      setEmail('');
      setPassword('');
    }

  }

  return (
    <div className="fixed w-full min-h-screen bg-gray-100 px-4">

      <div className="max-w-md mx-auto pt-15 flex justify-end">
        <Link to="/usersignup">
          <button
            type="button"
            className="border cursor-pointer border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
          >
            User Signup
          </button>
        </Link>
      </div>

      {/* Login Card */}
      <div className="flex items-center justify-center mt-2">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">

          {/* Heading */}
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Admin Login
          </h2>

          {/* Form */}
          <form className="space-y-4" onSubmit={(e) => {
            submitHandler(e)
          }}>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Admin Email
              </label>
              <input
                type="email"
                placeholder="Enter admin email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 cursor-pointer rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Login as Admin
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
