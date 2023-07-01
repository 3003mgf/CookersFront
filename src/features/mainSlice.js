import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { mainService } from "./mainService";

const initialState = {
  diets:[],
  recipes:[],
  recipeAdded: false,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ""
};

export const getDiets = createAsyncThunk("diets/get-diets", async(thunkAPI)=>{
  try{
    return await mainService.getDiets();
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
})

export const getRecipes = createAsyncThunk("recipes/get-recipes", async(thunkAPI)=>{
  try{
    return await mainService.getRecipes();
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
})


export const getRecipesByName = createAsyncThunk("recipes/get-by-name", async(data, thunkAPI)=>{
  try{
    return await mainService.getRecipesByName(data);
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
})


export const getRecipesSortedByName = createAsyncThunk("recipes/get-sorted-by-name", async(data, thunkAPI)=>{
  try{
    return await mainService.getRecipesSortedByName(data);
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
})


export const getRecipesSortedByHealth = createAsyncThunk("recipes/get-sorted-by-health", async(data, thunkAPI)=>{
  try{
    return await mainService.getRecipesSortedByHealth(data);
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
})


export const getRecipesSortedByCreated = createAsyncThunk("recipes/get-sorted-by-created", async(data, thunkAPI)=>{
  try{
    return await mainService.getRecipesSortedByCreated(data);
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
})


export const getRecipesSortedByDiet = createAsyncThunk("recipes/get-sorted-by-diet", async(data, thunkAPI)=>{
  try{
    return await mainService.getRecipesSortedByDiet(data);
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
})


export const createRecipe = createAsyncThunk("recipes/create-recipe", async(data, thunkAPI)=>{
  try{
    return await mainService.createRecipe(data);
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
})


export const resetRecipeAdded = createAction("reset-recipe-added");


export const mainSlice = createSlice({
  name: "mainData",
  initialState,
  reducers:{},
  extraReducers: (builder)=>{
    builder
          // GET DIETS
          .addCase(getDiets.pending, (state)=>{
            state.isLoading = true;
          })
          .addCase(getDiets.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = "Diets Received";
            state.diets = action.payload;
          })
          .addCase(getDiets.rejected, (state)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = "Error getting the diets";
            state.diets = [];
          })

          // GET RECIPES
          .addCase(getRecipes.pending, (state)=>{
            state.isLoading = true;
          })
          .addCase(getRecipes.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = "Recipes Received";
            state.recipes = action.payload;
          })
          .addCase(getRecipes.rejected, (state)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = "Error getting the recipes";
            state.recipes = [];
          })

          // GET RECIPES BY NAME
          .addCase(getRecipesByName.pending, (state)=>{
            state.isLoading = true;
          })
          .addCase(getRecipesByName.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = "Recipes by Name Received";
            state.recipes = action.payload;
          })
          .addCase(getRecipesByName.rejected, (state)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = "Error getting the recipes by name";
            state.recipes = [];
          })


          // GET RECIPES SORTED BY NAME
          .addCase(getRecipesSortedByName.pending, (state)=>{
            state.isLoading = true;
          })
          .addCase(getRecipesSortedByName.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = "Recipes Sorted by Name Received";
            state.recipes = action.payload;
          })
          .addCase(getRecipesSortedByName.rejected, (state)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = "Error getting the recipes sorted by name";
            state.recipes = [];
          })


          // GET RECIPES SORTED BY CREATED
          .addCase(getRecipesSortedByCreated.pending, (state)=>{
            state.isLoading = true;
          })
          .addCase(getRecipesSortedByCreated.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = "Recipes Sorted by Created Received";
            state.recipes = action.payload;
          })
          .addCase(getRecipesSortedByCreated.rejected, (state)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = "Error getting the recipes sorted by created";
            state.recipes = [];
          })


          // GET RECIPES SORTED BY HEALTH
          .addCase(getRecipesSortedByHealth.pending, (state)=>{
            state.isLoading = true;
          })
          .addCase(getRecipesSortedByHealth.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = "Recipes Sorted by Health Received";
            state.recipes = action.payload;
          })
          .addCase(getRecipesSortedByHealth.rejected, (state)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = "Error getting the recipes sorted by health";
            state.recipes = [];
          })


          // GET RECIPES SORTED BY DIET
          .addCase(getRecipesSortedByDiet.pending, (state)=>{
            state.isLoading = true;
          })
          .addCase(getRecipesSortedByDiet.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = "Recipes Sorted by Diet Received";
            state.recipes = action.payload;
          })
          .addCase(getRecipesSortedByDiet.rejected, (state)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = "Error getting the recipes sorted by diet";
            state.recipes = [];
          })


          // CREATE RECIPE
          .addCase(createRecipe.pending, (state)=>{
            state.isLoading = true;
          })
          .addCase(createRecipe.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = "Recipe created";
            state.recipes.push(action.payload);
            state.recipeAdded = true
          })
          .addCase(createRecipe.rejected, (state)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.recipeAdded = false;
            state.message = "Error creating the recipe";
          })

          .addCase(resetRecipeAdded, (state)=>{
            state.recipeAdded = false;
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
          })
  }
})