import './App.css';
import Login from '../src/pages/Login'
import Nopage from '../src/components/Nopage/Nopage'
import HomePage from '../src/components/HomePage/HomePage'
import MyRecipe from '../src/components/MyRecipe/MyRecipe'
import Recipe from '../src/components/Recipe/Recipe'
import AddRecipe from '../src/components/AddRecipe/AddRecipe'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState()
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={user ? <HomePage user={user} setUser={setUser} /> : <Navigate to="/login" />} />
          <Route path="/my-recipes" element={user ? <MyRecipe user={user} setUser={setUser} /> : <Navigate to="/login" />} />
          <Route path="/recipe/:id" element={user ? <Recipe user={user} setUser={setUser} /> : <Navigate to="/login" />} />
          <Route path="/add-recipe" element={user ? <AddRecipe user={user} setUser={setUser} isEdit={false}/> : <Navigate to="/login" />} />
          <Route path="/edit/:id" element={user ? <AddRecipe user={user} setUser={setUser} isEdit={true}/> : <Navigate to="/login" />} />
          <Route path="login" element={user ? <Navigate to="/" /> : <Login isLoginPage={true} user={user} setUser={setUser}/>} />
          <Route path="signup" element={user ? <Navigate to="/" /> : <Login isLoginPage={false} user={user} setUser={setUser}/>} />
          <Route path="*" element={<Nopage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
