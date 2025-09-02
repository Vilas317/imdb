import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams(); // movie id from URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const API_KEY = import.meta.env.VITE_TMDB_KEY;

        const res = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${pageNo}`
        );
        
        setMovie(res.data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <h2 className="text-center mt-4">Loading movie details...</h2>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <div className="flex gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="rounded-md"
        />
        <div>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
          <p className="mt-2">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
