import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../features/mainSlice';
import RecipeSmallCard from '../utils/recipeSmallCard';
import { FilterContext } from '../contexts/filtersContext';

const AllRecipes = () => {

  const dispatch = useDispatch();
  const data = useContext(FilterContext);
  const { pageStart, pageLimit } = data;
  const state = useSelector(state => state.mainData);
  const { recipes } = state;

  const [recipesData, setRecipesData] = useState([]);
  

  // useEffect(() => {
  //   dispatch(getRecipes());
  // }, []);

  useEffect(() => {
    let getPages = [];
    for(let i = 0; i < recipes.length; i++){
      if(i >= pageStart && i < pageLimit){
        getPages.push(recipes[i]);
      };
    }
    setRecipesData(getPages);
    console.log(pageStart, pageLimit);
  }, [recipes, pageStart, pageLimit]);

  return ( 
    <div className="all-recipes-wrapper">
      {recipesData.length > 0 ? recipesData.map((el, index)=> <RecipeSmallCard key={index} img={el.image} name={el.name} diets={el.dietsInfo} recipeId={el.id}/>)
        :
        <div>
          <div className='position-relative'>
            <img src="/images/chef-book.jpg" alt="abc" style={{width:"300px", height:"auto"}}/>
            <p className='position-absolute no-found'>Our Chef couldn't find any Recipe with that name!</p>
          </div>
        </div>
      }
    </div>
   );
}
 
export default AllRecipes;