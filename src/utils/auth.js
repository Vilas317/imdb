// src/utils/auth.js

// Save user to localStorage
export const saveUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };
  
  // Get current logged-in user
  export const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };
  
  // Logout user
  export const logoutUser = () => {
    localStorage.removeItem("user");
  };
  