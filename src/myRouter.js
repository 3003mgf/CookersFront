import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import SingleRecipe from './pages/SingleRecipe';
import AddRecipe from './pages/AddRecipe';

const Router = () => {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Welcome/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/recipe/:id" element={<SingleRecipe/>} />
        <Route exact path="/add-recipe" element={<AddRecipe/>} />
      </Routes>
    </BrowserRouter>
   );
}
 
export default Router;