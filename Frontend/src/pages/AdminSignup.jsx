import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "react-toastify"
import axiosInstance from "../utils/axiosInstance.js";

const AdminSignup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin")
  const { user, setUser } = useAuth()

  let navigate = useNavigate();

  let submitHandler = async (e) => {
    e.preventDefault();

    let adminData = {
      name: name,
      email: email,
      password: password,
      role : role
    }

    try {
      let response = await axiosInstance.post(`/admin/createadmin`, adminData, {
        withCredentials: true
      })
      if (response.status === 200) {
        let data = response.data
        if (data.user.role === "user") {
          localStorage.setItem("userToken", data.token);
        }
        else{
          localStorage.setItem("adminToken", data.token);
        }
        setUser(data.user);
        toast.success(data.message)
        setName("");
        setEmail("");
        setPassword("");
        setRole("select role")
        navigate("/admin");

      }

    } catch (error) {
      console.log("error = ", error.response);
      toast.error(error.response.data.message)
      setName("");
      setEmail("");
      setPassword("");
      setRole("select role")

    }

  }


  return (
    <div className="min-h-screen bg-gray-100 px-4">

      {/* User Signup Button (OUTSIDE CARD) */}
      <div className="max-w-md mx-auto pt-6 flex justify-end">
        <Link to="/usersignup">
          <button
            type="button"
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
          >
            User Signup
          </button>
        </Link>
      </div>

      {/* Signup Card */}
      <div className="flex items-center justify-center mt-1">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-4 sm:p-6">

          {/* Heading */}
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Admin Signup
          </h2>

          {/* Form */}
          <form className="space-y-4" onSubmit={(e)=>{
            submitHandler(e)
          }}>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter full name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                placeholder="Enter email address"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Create Account For
              </label>
              <select
                className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={role}
                onChange={(e)=>{
                  setRole(e.target.value)
                }}
              >
                <option value="">Select role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Create Account
            </button>
          </form>

          {/* Admin Login Redirect */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              to="/adminlogin"
              className="text-blue-600 font-medium hover:underline"
            >
              Admin Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
