import React from 'react'
import { useState, useEffect } from 'react'
import SkeletonCard from './SkeletonCard'
import { useRef } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { RxCross2 } from "react-icons/rx";
import { AiTwotonePlusCircle } from "react-icons/ai";
import { FaTimes, FaRegTimesCircle } from 'react-icons/fa';
import { IoIosSearch } from "react-icons/io";

const UserPage = () => {

  const [movies, setMovies] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [sort, setSort] = useState("all");
  const [uiMoviesData, setUiMoviesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const clearRef = useRef()

  useEffect(() => {
    function fetchMovies() {
      axiosInstance.get("/movies/getall/movies")
        .then((res) => {
          let movie = res.data.movie
          setMovies(movie);
          setUiMoviesData(movie)         
        })
        .catch((error) => { 
          console.log("error => ", error.response);
        })
        .finally(() => {
          setIsLoading(false)
        })

    }
    fetchMovies();
  }, []);

  function searchBtn() {
    axiosInstance.get(`/movies/search?keyword=${inputSearch}`,
      {
        withCredentials: true
      })
      .then((response) => {
        let data = response.data.movies
        clearRef.current.classList.remove("hidden")
        setUiMoviesData(data || [])
      })
      .catch((error)=>{
        console.log("search error = ",error.response);  
      })
  }

  useEffect(() => {

    function sortMovies() {
      axiosInstance.get(`/movies/sort?by=${sort}`)
        .then((response) => {
          let movies = response.data.movies
          clearRef.current.classList.add("hidden")
          setInputSearch("") 
          setUiMoviesData(movies)
        })
        .catch((error) => {
          console.log("movie sorting time error = ", error.response);
        })
    }

    sortMovies();
  }, [sort]);

  function clearSearch() {
    setInputSearch("");
    setUiMoviesData(movies);
    clearRef.current.classList.add("hidden")
  }

  if (isLoading) {
    return (
      <div className='h-full bg-[rgb(42,44,56)]'> 
         <div className='flex flex-wrap items-center gap-2 sm:gap-5 justify-between p-5'>
        <div className='bg-[rgb(27,30,36)] flex items-center rounded'>
            <IoIosSearch className='text-gray-200 ml-2 text-xl'/>
          <input className='text-gray-200 disabled outline-none rounded-lg p-1 w-auto sm:w-xs ' type="text" placeholder='Avatar movie...' value="" />

          <div className='flex items-center rounded-tr rounded-br'>
            <button ref={clearRef} className='text-white  px-3 rounded-full cursor-pointer hidden disabled'><RxCross2 className='text-2xl'/></button>

          <button className=' text-white bg-[#3d3d40] font-medium px-2 sm:px-5 py-1.5 rounded-tr rounded-br cursor-pointer disabled'>Search</button>
          </div>

        </div>

        <div>
          <select className='sm:w-40 px-2 py-2 pr-4 outline-none text-white rounded-lg p-1 cursor-pointer bg-[rgb(27,30,36)] disabled'
            value="" >
            <option value="all">All movies</option>
            <option value="release">Release date</option>
            <option value="rating">Rating</option>
            <option value="latest">Latest</option>
            <option value="runtime">Runtime</option>
          </select>
        </div>
      </div>
        <div>
          <h1 className="text-3xl font-bold text-white mt-2 ml-6 pb-3">🎬 Movies</h1>
        </div>
        <SkeletonCard />
      </div>
    )
  }

  return (
    <div className='h-full bg-[rgb(42,44,56)] p-5'>

      <div className='flex flex-wrap items-center gap-2 sm:gap-5 justify-between'>
        <div className='bg-[rgb(27,30,36)] flex items-center rounded'>
            <IoIosSearch className='text-gray-200 ml-2 text-xl'/>
          <input className='text-gray-200 outline-none rounded-lg p-1 w-47 sm:w-xs ' type="text" placeholder='Avatar movie...' value={inputSearch}
            onChange={(e) => {
              setInputSearch(e.target.value)
            }} />

          <div className='flex items-center rounded-tr rounded-br'>
            <button ref={clearRef} className='text-white  px-3 rounded-full cursor-pointer hidden' onClick={clearSearch}><RxCross2 className='text-2xl'/></button>

          <button className=' text-white bg-[#3d3d40] font-medium px-2 sm:px-5 py-1.5 rounded-tr rounded-br cursor-pointer' onClick={searchBtn}>Search</button>
          </div>

        </div>

        <div>
          <select className='sm:w-40 w-full pr-10 px-2 py-2 outline-none text-white rounded-lg p-1 cursor-pointer bg-[rgb(27,30,36)]'
            value={sort}
            onChange={(e) => {
              setSort(e.target.value)
            }}>
            <option value="all">All movies</option>
            <option value="release">Release date</option>
            <option value="rating">Rating</option>
            <option value="latest">Latest</option>
            <option value="runtime">Runtime</option>
          </select>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-white mt-12">🎬 Movies</h1>
      </div>
      {/*---------- get movies ----------------------*/}
      <div className=" bg-[rgb(42,44,56)] px-1 py-8">

        <div className="flex flex-wrap justify-center gap-6">
          {uiMoviesData.length === 0 ? (<div className="fixed w-full flex flex-col items-center justify-center py-15 px-4 pb-90 bg-[rgb(42,44,56)] rounded-2xl">

            <div className="text-6xl">🎬</div>

            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2 text-center">
              Movie Not Found
            </h2>

            <p className="text-gray-400 text-sm md:text-base text-center max-w-md">
              We couldn't find any movies matching your search or filter.
              Try adjusting your filters or search keywords.
            </p>

          </div>
          ) : (
            uiMoviesData.map((movie) => (
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
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  )
}

export default UserPage
