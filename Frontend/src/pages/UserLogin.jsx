import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {user , setUser} = useAuth();
  let navigate = useNavigate();

  const submitHandler = async (e) =>{
    e.preventDefault();
    let userData = {
      email: email,
      password: password
    }

    try {
      let response = await axiosInstance.post("/user/loginuser",userData,
      {
        withCredentials : true
      });
      if (response.status === 200) {
        let data = response.data;
        setUser(data.user);
        localStorage.setItem("userToken",data.token)
        toast.success(data.message);
        setEmail('');
        setPassword('');
        navigate("/")
      }

    } catch (error) {
      console.log("error = ",error.response);
      toast.error(error.response?.data.message);
      setEmail('');
      setPassword('');
    }

  }

  return (
    <div className="pt-18 fixed w-full flex items-center justify-center bg-gray-100 px-4 pb-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">
        
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          User Login
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={(e)=>{
          submitHandler(e)
        }}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e)=>{
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
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e)=>{
                setPassword(e.target.value)
              }}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Signup link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Not Register?{" "}
          <Link
            to="/usersignup"
            className="text-blue-600 font-medium hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
