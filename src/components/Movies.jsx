import React, { useState, useEffect, useContext } from 'react'
import Pagination from './Pagination'
import MovieCard from './MovieCard'
import axios from 'axios'

import { WatchListContext } from '../context/WatchListContext';
import { useSelector, useDispatch } from "react-redux"
import paginationSlice from '../redux/paginationSlice';
import moviesSlice from '../redux/moviesSlice';
import { fetchMovieMiddleware } from '../middlewares/fetchMovieMiddleware';

const Movies = () => {
    const { pageNo } = useSelector((state) => state.PaginationSlice)
    const { movies, loading, error } = useSelector(state => state.MoviesSlice)

    const dispatch = useDispatch()
    const { addToWatchlist, removeFromWatchlist, watchList, setWatchList } = useContext(WatchListContext)

    const [query, setQuery] = useState("");

    // 🔹 Fetch trending movies
    useEffect(() => {
        if (!query) {
            dispatch(fetchMovieMiddleware(pageNo));
        }
    }, [pageNo, query, dispatch]);

    // 🔹 Load watchlist from localStorage
    useEffect(() => {
        const moviesFromLS = localStorage.getItem('movies');
        if (moviesFromLS) {
            setWatchList(JSON.parse(moviesFromLS))
        }
    }, [setWatchList]);

    // 🔹 Save watchlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('movies', JSON.stringify(watchList));
    }, [watchList]);

    // 🔹 Search movies
    const handleSearch = async (e) => {
        e.preventDefault();
        if (query.trim() === "") {
            dispatch(fetchMovieMiddleware(pageNo));
        } else {
            try {
                const res = await axios.get(
                    `https://api.themoviedb.org/3/search/movie?api_key=YOUR_TMDB_KEY&query=${query}`
                );
                dispatch(moviesSlice.actions.setMovies(res.data.results));
            } catch (err) {
                console.error("Search error:", err);
            }
        }
    };

    function handlePrevious() {
        if (pageNo > 1) {
            dispatch(paginationSlice.actions.handlePrevious())
        }
    }

    function handleNext() {
        dispatch(paginationSlice.actions.handleNext())
    }

    if (loading) {
        return <h4 className="text-center mt-4">Trending movies loading...</h4>
    }
    if (error) {
        return <h4 className="text-center mt-4">Try again later...</h4>
    }

    return (
        <div>
            {/* 🔹 Search Bar */}
            <form onSubmit={handleSearch} className="flex justify-center my-4">
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="px-4 py-2 w-72 border rounded-md"
                />
                <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">
                    Search
                </button>
            </form>

            <div className='text-2xl font-bold text-center m-4'>
                <h2>{query ? "Search Results" : "Trending Movies"}</h2>
            </div>

            <div className='flex justify-around gap-8 flex-wrap'>
                {movies.map((movieObj, i) => (
                    <MovieCard
                        key={i}
                        movieObj={movieObj}
                        addToWatchlist={addToWatchlist}
                        watchList={watchList}
                        removeFromWatchlist={removeFromWatchlist}
                    />
                ))}
            </div>

            {!query && (
                <Pagination handleNext={handleNext} handlePrevious={handlePrevious} pageNo={pageNo} />
            )}
        </div>
    )
}

export default Movies;
