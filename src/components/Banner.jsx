import React, { useState, useEffect } from 'react'
import axios from 'axios';


const Banner = () => {
    const [bannerImg, setBannerImg] = useState("");
    const [title, setTitle] = useState("Placeholder Title");

    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=e278e3c498ab14e0469bf6d86da17045')
            .then(function (response) {
                // handle success

                const latestTrendingMovie = response.data.results[0];
                console.log(latestTrendingMovie)
                const latestTrendingMovieTitle = latestTrendingMovie.title
                const latestTrendingMovieImage = latestTrendingMovie.backdrop_path

                setTitle(latestTrendingMovieTitle)
                setBannerImg(`https://image.tmdb.org/t/p/original${latestTrendingMovieImage}`)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }, [])

    return (
        <div
            className='h-[25vh] md:h-[75vh] bg-cover bg-center flex items-end'
            style={{ backgroundImage: `url(${bannerImg})` }}
        >

            <div className='text-white text-xl text-center w-full'>
                {title}
            </div>
        </div>
    )
}

export default Banner