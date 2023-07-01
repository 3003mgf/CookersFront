import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeSmallCard = ({img, name, diets, recipeId}) => {
 
  const navigate = useNavigate();
 
  return ( 
    <div className='recipe-card'>
      <div className='recipe-card-image'>
        <img src={img} alt="abc" onClick={()=>navigate(`/recipe/${recipeId}`)} width={400} height={296.15}/>
      </div>
      <div className='recipe-card-details'>
        <div className='recipe-card-title'>
          <p>{name}</p>
        </div>
        <div className='recipe-card-diets'>
            {diets && diets.length ? diets.map((el, index) => <div className='recipe-card-ul'><img className='recipe-card-icon' src={el === "vegan" ? "https://spoonacular.com/application/frontend/images/badges/vegan.svg" : el === "dairy free" ? "https://spoonacular.com/application/frontend/images/badges/dairy-free.svg" : el === "gluten free" ? "https://spoonacular.com/application/frontend/images/badges/gluten-free.svg" : el === "lacto ovo vegetarian" ? "https://spoonacular.com/application/frontend/images/badges/vegetarian.svg" : el === "primal" ? "https://spoonacular.com/application/frontend/images/badges/paleo.svg" : el === "paleolithic" ? "https://spoonacular.com/application/frontend/images/badges/paleo.svg" : el === "whole 30" ? "https://www.svgrepo.com/show/275097/healthy-food-carrot.svg" : el === "ketogenic" ? "https://www.svgrepo.com/show/275080/broccoli.svg" : el === "pescatarian" ? "https://spoonacular.com/application/frontend/images/badges/pescetarian.svg" : el === "fodmap friendly" ? "https://www.svgrepo.com/show/275107/healthy-food-vegetable.svg" : ""} alt="" /><span key={index}>{el}</span></div>)
              :  
              <div className='recipe-card-ul'>
                <img src="/images/peer.svg" alt="abc" width={35} height={35} className='diet-image' />
                <span>{"No diets provided by the creator :("}</span>
              </div>
            }
        </div>
      </div>
    </div>
   );
}
 
export default RecipeSmallCard;