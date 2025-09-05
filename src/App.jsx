import './App.css';
import Home from './components/Home';
import WatchList from './components/WatchList';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import WatchListContextWrapper from './context/WatchListContext';
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";

// 👇 new imports
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile"; // optional page

function App() {
  return (
    <>
      <Navbar />
      <WatchListContextWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetails />} />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </WatchListContextWrapper>
    </>
  );
}

export default App;
