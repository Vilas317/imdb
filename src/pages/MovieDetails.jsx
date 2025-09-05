import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`, // 👈 Bearer token
            },
          }
        );
        setMovie(res.data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Failed to load movie details.");
      }
    };

    fetchMovie();
  }, [id]);

  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;
  if (!movie) return <p className="text-center mt-6">Loading movie details...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="rounded-lg shadow-lg mb-4"
      />
      <p className="text-gray-700">{movie.overview}</p>
      <p className="mt-2"><b>Release Date:</b> {movie.release_date}</p>
      <p><b>Rating:</b> ⭐ {movie.vote_average}</p>
      <p><b>Runtime:</b> {movie.runtime} minutes</p>
    </div>
  );
};

export default MovieDetails;
