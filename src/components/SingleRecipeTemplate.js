import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getDiets, getRecipes } from '../features/mainSlice';

const SingleRecipeTemplate = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(state => state.mainData);
  const { recipes } = state;

  const { id } = useParams();
  const [recipeWanted, setRecipeWanted] = useState(null);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
  }, []);

  useEffect(() => {
    console.log(id, recipes);
    let getRecipe = recipes.filter(el => el.id === Number(id));
    setRecipeWanted(getRecipe[0]);
    console.log(getRecipe);
    let parsedSteps = getRecipe[0]?.stepbyStep?.map(el => JSON.parse(el));
    if(parsedSteps){
      setSteps(parsedSteps);
    }else{
      setSteps([]);
    }
  }, [recipes]);

  let validateEquipment = 0;

  return ( 
    <div className="single-recipe-wrapper">
      <div className='w-60 sr-details'>
        <div className='d-flex align-items-center' style={{marginBottom:"2rem", color:"#777777", cursor:"pointer"}}>
          <img src="/images/go-back.svg" alt="abc" />
          <span onClick={()=> navigate("/home")}>Go Back Home</span>
        </div>
        <div className="sr-title">
          <p>{recipeWanted?.name}</p>
        </div>
        <div>
          <b>What is this plate about?</b>
          <p style={{paddingTop:"1rem", lineHeight:"28px"}}  dangerouslySetInnerHTML={{__html: recipeWanted?.summary}}></p>
        </div>
        <div className='ingredients-div'>
            <p><b>What ingredients do you need?</b></p>
            <div className='ingredients-list'>
              {steps.length && recipeWanted?.createdIndb === false && steps.map((el, index) => {
                  if(el.ingredients.length){
                    return (
                      <div key={index} className='ingredients'>
                        <img src="/images/ingredients.svg" alt="abc"/>
                        <span>{el.ingredients[0].name}</span>
                      </div>
                      )
                  }
              })}
              {steps.length && recipeWanted.createdIndb === true && 
                steps[0].ingredients.split(",").map((el, index) => {
                  return (
                    <div key={index} className='ingredients'>
                      <img src="/images/ingredients.svg" alt="abc"/>
                      <span>{el}</span>
                    </div>
                  )
                })
              }
            </div>
        </div>
        <div className="steps-div">
          <p><b>Steps to Follow</b></p>
          <div className='steps-list'>
            {steps.length && steps.map((el, index) => {
                return (
                  <div key={index} className='steps-sub-div'>
                    <div className='step-icon'>
                      <span>{el.number}</span>
                    </div>
                    <div className='step-details'>
                      <p>{el.step}</p>
                    </div>
                  </div>
                  )
            })}
          </div>
        </div>
      </div>
      <div className='w-40'>
        <div className="sr-main-image">
            <img src={recipeWanted?.image} alt="abc" />
        </div>
        <div className='sr-diet-icons-container'>
          <p style={{paddingBottom:"1rem"}}><b>Ideal for diets like:</b></p>
          {recipeWanted?.dietsInfo?.length ? recipeWanted?.dietsInfo?.map((el, index) => (
            <div key={index} className='sr-diet-icons'>
              <img src={el === "vegan" ? "https://spoonacular.com/application/frontend/images/badges/vegan.svg" : el === "dairy free" ? "https://spoonacular.com/application/frontend/images/badges/dairy-free.svg" : el === "gluten free" ? "https://spoonacular.com/application/frontend/images/badges/gluten-free.svg" : el === "lacto ovo vegetarian" ? "https://spoonacular.com/application/frontend/images/badges/vegetarian.svg" : el === "primal" ? "https://spoonacular.com/application/frontend/images/badges/paleo.svg" : el === "paleolithic" ? "https://spoonacular.com/application/frontend/images/badges/paleo.svg" : el === "whole 30" ? "https://www.svgrepo.com/show/275097/healthy-food-carrot.svg" : el === "ketogenic" ? "https://www.svgrepo.com/show/275080/broccoli.svg" : el === "pescatarian" ? "https://spoonacular.com/application/frontend/images/badges/pescetarian.svg" : el === "fodmap friendly" ? "https://www.svgrepo.com/show/275107/healthy-food-vegetable.svg" : ""} alt="abc" width={35} height={35} className='diet-image' />
              <span>{el}</span>
            </div>
          ))
          :
            <div className='sr-diet-icons'>
              <img src="/images/peer.svg" alt="abc" width={35} height={35} className='diet-image' />
              <span>{"No diets provided by the creator :("}</span>
            </div>
          }
          
          {/* EQUIPMENT */}
          <div>
            <p style={{paddingTop:"3rem", paddingBottom:"0.5rem"}}><b>What equipment do you need?</b></p>
            <div className='sr-equipment-container'>
              {steps.length && recipeWanted?.createdIndb === false && steps.map((el, index) => {
                if(el.equipment.length){
                  validateEquipment = validateEquipment + 1;
                  return (
                    <div className='sr-equipment' key={index}>
                      <img src="/images/kitchen.svg" alt="abc" width={30} height={30}/>
                      <span>{el.equipment[0].name}</span>
                    </div>
                    )
                  }
                })}
              {steps.length && recipeWanted.createdIndb === true && 
                steps[0].equipment.split(",").map((el, index) => {
                  validateEquipment = validateEquipment + 1;
                  return (
                    <div key={index} className='sr-equipment'>
                      <img src="/images/kitchen.svg" alt="abc" width={30} height={30}/>
                      <span>{el}</span>
                    </div>
                  )
                })
              }
              {validateEquipment === 0 && 
                <div className='sr-equipment'>
                  <img src="/images/kitchen.svg" alt="abc" width={30} height={30}/>
                  <span style={{textTransform:"none"}}>{"No equipment provided by the creator :("}</span>
                </div>
              }
            </div>
          </div>
          
          {/* HEALTH */}
          <div>
            <p style={{paddingTop:"3rem", paddingBottom:"2rem"}}><b>How healthy is this recipe?</b></p>
            <div className='sr-healthy-wrapper d-flex align-items-center gap-40' style={{marginLeft:"1rem"}}>
              <div>
                <img src="/images/biceps.svg" alt="abc" width={60} height={60} />
              </div>
              <div className='healthy-level'>
                <span>{recipeWanted?.healthScore}%</span>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
   );
}
 
export default SingleRecipeTemplate;