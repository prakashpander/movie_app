import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios"
import axiosInstance from "../utils/axiosInstance";

const AddMovie = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [rating, setRating] = useState(0)
  const [releaseDate, setReleaseDate] = useState("")
  const [duration, setDuration] = useState(0)
  const [file, setFile] = useState(null);
  let token = localStorage.getItem("adminToken")


  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("rating", rating);
    formData.append("releaseDate", releaseDate);
    formData.append("duration", duration);
    formData.append("file", file);

    setIsLoading(true)
  try {
      let response = await axiosInstance.post("/movies/addmovie", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    })
    if (response.status === 200) {
      toast.success(response.data.message)
      navigate("/admin")
      setIsLoading(false)
    }
  } catch (error) {
    console.log("Movie add error = ",error.response);
    toast.error(error.response?.data.message)
    setIsLoading(false)
  }

  };

  return (
    <div className="min-h-screen bg-[rgb(20,22,30)] flex items-center justify-center p-6 text-white">

      <div className="relative w-full max-w-xl bg-[rgb(30,32,44)] rounded-xl shadow-lg p-8">

        {/* Close Button */}
        <button
          onClick={() => navigate("/admin")}
          className="absolute top-4 right-4 bg-red-600 px-2 rounded cursor-pointer text-gray-200 text-xl font-bold py-0.5"
          title="Back to Dashboard"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add New Movie
        </h2>

        <form onSubmit={handleSubmit}>

          {/* Movie Name */}
          <div className="mb-4">
            <label className="block mb-1 text-sm">Movie Name</label>
            <input
              type="text"
              name="name"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
              className="w-full bg-[rgb(42,44,56)] px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block mb-1 text-sm">Description</label>
            <textarea
              name="description"
              rows="3"
              required
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
              }}
              className="w-full bg-[rgb(42,44,56)] px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
            ></textarea>
          </div>

          {/* Rating + Duration */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 text-sm">Rating</label>
              <input
                type="number"
                name="rating"
                step="0.1"
                min="0"
                max="10"
                required
                value={rating}
                onChange={(e) => {
                  setRating(e.target.value)
                }}
                className="w-full bg-[rgb(42,44,56)] px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Duration (min)</label>
              <input
                type="number"
                name="duration"
                required
                value={duration}
                onChange={(e) => {
                  setDuration(e.target.value)
                }}
                className="w-full bg-[rgb(42,44,56)] px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Release Date */}
          <div className="mb-4">
            <label className="block mb-1 text-sm">Release Date</label>
            <input
              type="date"
              name="releaseDate"
              required
              value={releaseDate}
              onChange={(e) => {
                setReleaseDate(e.target.value)
              }}
              className="w-full bg-[rgb(42,44,56)] px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Image */}
          <div className="mb-6">
            <label className="block mb-1 text-sm">Movie Poster</label>
            <input
              type="file"
              name="file"
              accept="image/*"
              required
              onChange={(e) => {
                setFile(e.target.files[0])
              }}
              className="w-full bg-[rgb(42,44,56)] px-3 py-2 rounded-lg text-sm"
            />
          </div>

          {/* Submit */}
         {isLoading == true ? (<button disabled
            className="w-full bg-gray-600 py-2 rounded-lg font-medium"
          >
            Uploading...
          </button>) : ( <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 py-2 rounded-lg font-medium cursor-pointer"
          >
            Add Movie
          </button>)}

        </form>
      </div>
    </div>
  );
};

export default AddMovie;
