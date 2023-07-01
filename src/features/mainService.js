import axios from "axios";
import { BACK_URL } from "../keys";


const getDiets = async() =>{
  const response = await axios.get(`${BACK_URL}/diets/get-diets`);

  return response.data;
};

const getRecipes = async(data) =>{
  const response = await axios.get(`${BACK_URL}/recipes/get-all-recipes`);

  return response.data;
};


const getRecipesByName = async(name) =>{
  const response = await axios.get(`${BACK_URL}/recipes/get-by-name?name=${name}`);
  
  
  return response.data;
};


const getRecipesSortedByName = async(sort) =>{
  const response = await axios.get(`${BACK_URL}/recipes/get-sorted-by-name/${sort}`);
  
  
  return response.data;
};

const getRecipesSortedByHealth = async(sort) =>{
  const response = await axios.get(`${BACK_URL}/recipes/get-sorted-by-health/${sort}`);
  
  return response.data;
};

const getRecipesSortedByCreated = async(sort) =>{
  const response = await axios.get(`${BACK_URL}/recipes/get-sorted-by-created/${sort}`);

  return response.data;
};

const getRecipesSortedByDiet = async(diet) =>{
  const response = await axios.get(`${BACK_URL}/recipes/get-sorted-by-diet/${diet}`);

  return response.data;
};

const createRecipe = async(recipe) =>{
  const response = await axios.post(`${BACK_URL}/recipes/create-recipe`, recipe);

  return response.data;
};


export const mainService = {
  getDiets,
  getRecipes,
  getRecipesByName,
  getRecipesSortedByName,
  getRecipesSortedByHealth,
  getRecipesSortedByCreated,
  getRecipesSortedByDiet,
  createRecipe
}