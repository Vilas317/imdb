import React, { useEffect, useState } from "react";
import genreids from "../constants/genre";

const getGenreFromGenreIds = (genreIdsArr) => {
  let res = [];
  for (let i = 0; i < genreIdsArr.length; i++) {
    res.push(genreids[genreIdsArr[i]]);
  }
  return res.join(", ");
};

const WatchList = () => {
  const [watchListMovies, setWatchListMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All Genres");

  useEffect(() => {
    const moviesFromLS = localStorage.getItem("movies");
    if (moviesFromLS) {
      setWatchListMovies(JSON.parse(moviesFromLS));
    }
  }, []);

  useEffect(() => {
    if (watchListMovies.length > 0) {
      let copyOfMovies = watchListMovies.map(
        (movie) => genreids[movie.genre_ids[0]]
      );
      copyOfMovies = new Set(copyOfMovies);
      setGenreList(["All Genres", ...copyOfMovies]);
    } else {
      setGenreList(["All Genres"]);
    }
  }, [watchListMovies]);

  const handleAscRatings = () => {
    const sorted = watchListMovies.sort((a, b) => a.vote_average - b.vote_average);
    setWatchListMovies([...sorted]);
  };

  const handleDescRatings = () => {
    const sorted = watchListMovies.sort((a, b) => b.vote_average - a.vote_average);
    setWatchListMovies([...sorted]);
  };

  const handleDelete = (id) => {
    const updated = watchListMovies.filter((movie) => movie.id !== id);
    setWatchListMovies(updated);
    localStorage.setItem("movies", JSON.stringify(updated));
  };

  if (watchListMovies.length === 0) {
    return <p className="m-4">Your watchlist is empty. Add some movies!</p>;
  }

  const handleSearch = (ev) => {
    setSearch(ev.target.value);
  };

  const handleGenreSelection = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <>
      {/* Genre filter buttons */}
      <div className="flex justify-center my-4 flex-wrap gap-2">
        {genreList.map((genre, i) => {
          const isActive = genre === selectedGenre;
          return (
            <div
              key={i}
              className={`px-4 py-2 rounded-xl font-bold cursor-pointer 
                ${isActive ? "bg-blue-400 text-white" : "bg-gray-300"}`}
              onClick={() => handleGenreSelection(genre)}
            >
              {genre}
            </div>
          );
        })}
      </div>

      {/* Search bar */}
      <div className="flex my-8 justify-center">
        <input
          type="text"
          placeholder="Search movies..."
          className="h-[3rem] w-[20rem] bg-gray-200 outline-none border border-gray-400 p-2 rounded-lg"
          value={search}
          onChange={handleSearch}
        />
      </div>

      {/* Table */}
      <div className="border border-gray-400 rounded-lg m-5 overflow-hidden">
        <table className="w-full bg-white border-collapse text-left text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-6 py-4 font-medium text-gray-900">Name</th>
              <th className="font-medium text-gray-900">
                <div className="flex">
                  <i
                    className="fa-solid fa-arrow-up cursor-pointer p-1"
                    onClick={handleAscRatings}
                  ></i>
                  Ratings
                  <i
                    className="fa-solid fa-arrow-down cursor-pointer p-1"
                    onClick={handleDescRatings}
                  ></i>
                </div>
              </th>
              <th className="font-medium text-gray-900">Popularity</th>
              <th className="font-medium text-gray-900">Genre</th>
              <th className="font-medium text-gray-900">Delete</th>
            </tr>
          </thead>
          <tbody className="border-t border-gray-600 divide-y divide-gray-200">
            {watchListMovies
              .filter((movie) => {
                if (selectedGenre === "All Genres") return true;
                return getGenreFromGenreIds(movie.genre_ids).includes(selectedGenre);
              })
              .filter((movie) =>
                movie.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((movie) => {
                return (
                  <tr key={movie.id}>
                    <td className="flex items-center px-6 py-4 font-normal text-gray-900">
                      <img
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={movie.title}
                        className="h-[5rem] w-[8rem] object-cover rounded"
                      />
                      <div className="text-sm font-medium pl-2">
                        {movie.title}
                      </div>
                    </td>
                    <td className="py-4">{movie.vote_average}</td>
                    <td className="py-4">{movie.popularity}</td>
                    <td className="py-4">{getGenreFromGenreIds(movie.genre_ids)}</td>
                    <td
                      className="py-4 text-red-500 cursor-pointer"
                      onClick={() => handleDelete(movie.id)}
                    >
                      Delete
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WatchList;
