import React from 'react'

const MovieCard = (props) => {
    const { movieObj, addToWatchlist, watchList, removeFromWatchlist } = props;
    // const { movieObj } = props;
    console.log(watchList, 'watchlist array');

    function doesContainWatchlist(movieObject) {
        //  also can use .filter method.
        for (let i = 0; i < watchList.length; i++) {
            if (movieObject.id === watchList[i].id) {
                return true
            }
        }
        return false;
    }
    return (

        <div
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movieObj.poster_path})` }}
            className='h-[40vh] w-[200px] bg-cover bg-center flex items-start rounded-xl hover:scale-110 duration-200 hover:cursor-pointer'
        >
            <div className='text-white text-center w-full p-2 bg-gray-900/50 rounded-xl'>{movieObj.title}</div>

            {doesContainWatchlist(movieObj) ? <div
                className='m-3 flex justify-center h-4 w-4 items-center bg-gray-900/50 rounded-xl'
                onClick={() => removeFromWatchlist(movieObj)}
            >❌ </div>
                :
                <div
                    className='m-3 flex justify-center h-4 w-4 items-center bg-gray-900/50 rounded-xl'
                    onClick={() => addToWatchlist(movieObj)}
                >😍</div>
            }
        </div>
    )
}

export default MovieCard