import { createContext, useState, useEffect } from "react";

const WatchListContext = createContext();

export default function WatchListContextWrapper(props) {
    const [watchList, setWatchList] = useState([]);
    useEffect(() => {
        const moviesFromLS = localStorage.getItem('movies');
        if (moviesFromLS) {
            setWatchList(JSON.parse(localStorage.getItem('movies')))
        }
    }, [])

    function addToWatchlist(movieObj) {
        console.log("addToWatchlist called with ", movieObj)
        const updatedWatchlist = [...watchList, movieObj];
        setWatchList(updatedWatchlist);

        localStorage.setItem('movies', JSON.stringify(updatedWatchlist))
    }

    function removeFromWatchlist(movieObj) {
        let filteredMovies = watchList.filter((movie) => movie.id !== movieObj.id)
        setWatchList(filteredMovies);
        localStorage.setItem('movies', JSON.stringify(filteredMovies))

    }

    console.log("[props.children] in WatchListContext", props.children);

    // syntax for context provider...
    return <WatchListContext.Provider
        value={{ addToWatchlist, removeFromWatchlist, watchList, setWatchList }}
    >
        {props.children}
    </WatchListContext.Provider>

}

export { WatchListContext }