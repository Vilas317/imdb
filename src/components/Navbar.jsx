import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/imdb-logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // ✅ check login user

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div className="flex space-x-8 items-center pl-3 py-4 bg-gray-100 shadow-md">
      {/* Logo */}
      <Link to={"/"}>
        <img className="w-14" src={Logo} alt="IMDb icon" />
      </Link>

      {/* Navigation Links */}
      <Link to={"/movies"} className="text-blue-600 text-2xl font-bold">
        Movies
      </Link>

      {user && (
        <Link to={"/watchlist"} className="text-blue-600 font-bold text-2xl">
          WatchList
        </Link>
      )}

      {/* Auth Links (right side) */}
      <div className="ml-auto flex space-x-6 pr-6">
        {user ? (
          <button
            onClick={handleLogout}
            className="text-red-600 font-semibold text-lg hover:underline"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to={"/login"}
              className="text-green-600 font-semibold text-lg hover:underline"
            >
              Login
            </Link>
            <Link
              to={"/signup"}
              className="text-green-600 font-semibold text-lg hover:underline"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
