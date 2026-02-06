import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SkeletonCard from "./SkeletonCard";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const AdminPage = () => {

  const [movies, setMovies] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  let token = localStorage.getItem("adminToken");

  useEffect(() => {
    function fetchMovies() {
      axiosInstance.get("/movies/getall/movies", {
        withCredentials: true
      })
        .then((response) => {
          if (response.status === 200) {
            let data = response.data;
            setMovies(data.movie)
            setIsLoading(false)
          }
        })
        .catch((error) => {
          console.log("get movies error in admin = ", error.response);
        })
        .finally(() => {

        })
    }
    fetchMovies()
  }, [refresh]);

  const deleteMovie = async (id) => {
    try {
      let response = await axiosInstance.delete(`/movies/deletemovie/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.status === 200) {
        let data = response.data;
        toast.success(data.message);
        setRefresh(prev => !prev)
      }

    } catch (error) {
      console.log("delete movie error = ", error.response);
      toast.error(error.response?.data.message)
    }
  }

  if (isLoading) {
    return (
      <SkeletonCard />
    )
  }


  return (
    <div>
    <div className="min-h-screen bg-[rgb(20,22,30)] text-white p-6">

      {/* Header */}
      <div className="flex gap-2 justify-center ">
        <p className="text-sm md:text-base text-gray-400 italic mt-2 mb-4">
        Dummy movies are added below for testing. Scroll down to view. 
      </p>
      <a
        href="#dummyData"
        className="text-sm md:text-base underline text-blue-400 italic mt-2 mb-4"
      >
         Go to Dummy Data ↓
      </a>
      </div>
      <div className="flex flex-wrap justify-between items-center gap-5 mb-8">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>

        <div className="flex gap-3">
          <Link to="/addmovie">
            <button className="bg-teal-500 hover:bg-teal-600 px-2 py-2 rounded-lg font-medium flex items-center gap-2 cursor-pointer">
              + Add Movie
            </button>
          </Link>
          <Link to="/adminsignup">
            <button className="bg-teal-500 hover:bg-teal-600 px-2 py-2 rounded-lg font-medium flex items-center gap-2 cursor-pointer">
              Create new admin
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6">

        {movies.map((movie) => (
          <div
            key={movie._id}
            className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-105
              w-full sm:w-[48%] md:w-[31%] lg:w-[23%]"
          >
            <img
              src={movie.image?.url || movie.image}
              alt={movie.name}
              className="h-auto md:h-58 w-full object-fill"
            />

            <div className="p-4 text-white">
              <h2 className="text-lg font-semibold truncate">
                {movie.name}
              </h2>

              <p className="text-sm text-gray-300 mt-1 line-clamp-2">
                {movie.description}
              </p>

              <div className="flex justify-between items-center mt-3 text-sm">
                <span className="text-yellow-400">⭐ {movie.rating}</span>
                <span className="text-gray-300">{movie.duration} min</span>
              </div>

              <p className="text-xs text-gray-300 mt-2">
                Release: {new Date(movie.releaseDate).toDateString()}
              </p>

              <div className="flex justify-center gap-3 mt-2">
                <Link to={`/updatemovie/${movie._id}`} className="w-1/2 text-white font-medium text-center bg-green-500 hover:bg-green-600 py-2 rounded-md text-sm cursor-pointer">
                  <button className="cursor-pointer">
                    Update
                  </button></Link>

                <button className="w-1/2 text-white font-medium text-center bg-red-500 hover:bg-red-600 py-2 rounded-md text-sm cursor-pointer"
                  onClick={() => {
                    deleteMovie(movie._id)
                  }}>
                  Delete
                </button>
              </div>

            </div>

          </div>
        ))}

      </div>


    </div>
      <footer id="dummyData" className="w-full bg-[#0f1117] text-gray-400">
      <div className=" px-5 py-8">

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          <h1 className="text-white text-xl font-semibold">
            MovieApp
          </h1>

          <div className="flex gap-6 text-sm">
            <Link to="/admin" className="hover:text-white transition">
              Home
            </Link>
            <Link to="/adminlogin" className="hover:text-white transition">
              Admin Login
            </Link>
            <Link to="/adminsignup" className="hover:text-white transition">
              Signup
            </Link>
          </div>

          <div className="flex gap-4 text-lg">
            <a href="#" className="hover:text-white transition">
              <FaGithub />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <p className="text-center text-xs text-gray-500 mt-6">
          © 2026 MovieApp.
        </p>

      </div>
    </footer>
    </div>
  );
};

export default AdminPage;
