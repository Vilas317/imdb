import React from 'react'
import { Link } from 'react-router-dom';
import Logo from '../assets/imdb-logo.png'

const Navbar = () => {
    return (
        <div className='flex space-x-8 items-center pl-3 py-4'>
            <Link to={'/'}>
                <img className='w-14' src={Logo} alt='IMDb icon' />
            </Link>
            <Link to={'/'} className='text-blue-600 text-2xl font-bold'>Movies</Link>
            <Link to={'/watchlist'} className='text-blue-600 font-bold text-2xl'>WatchList</Link>
        </div>
    )
}

export default Navbar