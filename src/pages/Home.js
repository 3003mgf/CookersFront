import React from 'react';
import NavBar from '../components/NavBar';
import Filters from '../components/Filters';
import AllRecipes from '../components/AllRecipes';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';

const Home = () => {
  return ( 
    <div className='home-wrapper'>
      <NavBar/>
      <Filters/>
      <Pagination/>
      <AllRecipes/>
      <Footer/>
    </div>
   );
}
 
export default Home;