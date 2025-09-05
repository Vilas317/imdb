import React from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const MovieCard = ({ movieObj, addToWatchlist, removeFromWatchlist, watchList }) => {
  const isInWatchlist = watchList.some((m) => m.id === movieObj.id);

  return (
    <div className="relative bg-gray-900 text-white rounded-lg shadow-md overflow-hidden w-48">
      {/* Poster wrapped in Link → movie details */}
      <Link to={`/movie/${movieObj.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movieObj.poster_path}`}
          alt={movieObj.title}
          className="w-full h-64 object-cover cursor-pointer"
        />
      </Link>

      {/* ❤️ Heart Icon */}
      <button
        onClick={() =>
          isInWatchlist
            ? removeFromWatchlist(movieObj)
            : addToWatchlist(movieObj)
        }
        className="absolute top-2 right-2 text-xl"
      >
        <FaHeart className={isInWatchlist ? "fill-red-600" : "fill-gray-400"} />
      </button>

      <div className="p-2">
        <h3 className="text-sm font-semibold truncate">{movieObj.title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
