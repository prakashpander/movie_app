import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {

  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-[#111217] shadow-md">
      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className=" h-9 bg-[#111217] text-white rounded-lg flex items-center justify-center font-bold text-lg">
            <img className="border-2 bg-white rounded-full h-10" src="https://cdn-icons-png.flaticon.com/512/6737/6737690.png" alt="logo" />
          </div>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4 relative">

          <div className="flex flex-raw items-center gap-1.5 text-white">
            <span className="text-sm font-medium">Admin Login</span> <FaArrowRight className="mt-0.5"/>
          </div>

          {/* Profile Icon */}
          <CgProfile
            className="text-white text-3xl cursor-pointer hover:text-slate-400 transition"
            onClick={() => setOpen(!open)}
          />

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute right-0 top-12 w-44 z-10 bg-white text-black rounded-lg shadow-lg overflow-hidden">

              <Link
                to="/usersignup"
                className="block px-4 py-2 hover:bg-gray-200"
                onClick={() => setOpen(false)}
              >
                User Signup
              </Link>

              <Link
                to="/userlogin"
                className="block px-4 py-2 hover:bg-gray-200"
                onClick={() => setOpen(false)}
              >
                User Login
              </Link>

              <Link
                to="/adminlogin"
                className="block px-4 py-2 hover:bg-gray-200"
                onClick={() => setOpen(false)}
              >
                Admin Login
              </Link>

            </div>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
