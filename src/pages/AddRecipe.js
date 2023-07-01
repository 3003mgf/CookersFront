import React, { createElement, useEffect, useRef, useState } from 'react';
import NavBar from '../components/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createRecipe, getDiets, resetRecipeAdded } from '../features/mainSlice';
import HealthToast from '../utils/healthModal';
import AddInfoModal from '../utils/addInfoModal';
import SuccessModal from '../utils/successModal';

const initialForm = {
  name:"",
  image:"",
  summary:"",
  healthScore: 0,
  dietsInfo: [],
  stepbyStep: [],
  createdIndb: true
};



const AddRecipe = () => {
  const state = useSelector(state => state.mainData);
  const { diets, recipeAdded, isLoading, isError, isSuccess } = state;
  const dispatch = useDispatch();
  const navigate  = useNavigate();


  const [form, setForm] = useState(initialForm);
  const [step1, setStep1] = useState({number: 1, step: ""});
  const [step2, setStep2] = useState({number: 2, step: ""});
  const [step3, setStep3] = useState({number: 3, step: ""});
  const [step4, setStep4] = useState({number: 4, step: ""});
  const [stepsAdded, setStepsAdded] = useState(1);
  const [dietsAdded, setDietsAdded] = useState([]);
  const [reachMaxScore, setReachMaxScore] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [ingredients, setIngredients] = useState(null);
  const [equipment, setEquipment] = useState(null);
  const [validation, setValidation] = useState({
    name:"", 
    summary:"", 
    image:"", 
    steps:"", 
    diets:"", 
    health:"", 
    ingredients:"", 
    equipment:"",
    alert:""
  });

  const handleChange = (e) =>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  };

  const handleAddStep = () =>{
    if(stepsAdded < 4){
      setStepsAdded(stepsAdded + 1);
    }
  };

  const handleMinus = (e) =>{
    if(stepsAdded > 1){
      if(stepsAdded === 4){
        setStep4({number: 4, step:""})
      };
      if(stepsAdded === 3){
        setStep3({number: 3, step:""})
      };
      if(stepsAdded === 2){
        setStep2({number: 2, step:""})
      };
      setStepsAdded(stepsAdded - 1);
    }
  };

  const handleStepChange1 = (e) =>{
    setStep1({
      ...step1,
      step: e.target.value
    })
  };
  const handleStepChange2 = (e) =>{
    setStep2({
      ...step2,
      step: e.target.value
    })
  };
  const handleStepChange3 = (e) =>{
    setStep3({
      ...step3,
      step: e.target.value
    })
  };
  const handleStepChange4 = (e) =>{
    setStep4({
      ...step4,
      step: e.target.value
    })
  };

  const handleDietIcon = (e) =>{
    if(!e.target.classList.contains("active")){
      e.target.classList.add("active");
      setDietsAdded([...dietsAdded, e.target.name])
    }else if(e.target.classList.contains("active")){
      e.target.classList.remove("active");
      let newArray = dietsAdded.filter(el => el !== e.target.name);
      setDietsAdded(newArray);
    }
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    let finalSteps = [];
    step1.step && finalSteps.push({...step1, ingredients, equipment});
    step2.step && finalSteps.push(step2);
    step3.step && finalSteps.push(step3);
    step4.step && finalSteps.push(step4);

    let finalObj = {...form, dietsInfo: dietsAdded, stepbyStep: finalSteps};
    let validationObj = {};

    if(finalSteps.length === 0)validationObj.steps = "empty";
    if(!finalObj.name)validationObj.name = "empty";
    if(!finalObj.summary)validationObj.summary = "empty";
    if(!finalObj.image)validationObj.image = "empty";
    if(!finalObj.dietsInfo.length)validationObj.diets = "empty";
    if(!ingredients)validationObj.ingredients = "empty";
    if(!equipment)validationObj.equipment = "empty";
    if(stepsAdded !== finalSteps.length)validationObj.steps = "empty"
    
    if(Object.keys(validationObj).length > 0){
      validationObj.alert = "true";
      setValidation(validationObj);
      return window.scrollTo(0, 0);
    }else if(Object.keys(validationObj).length === 0){
      setValidation(validationObj);
      console.log("exito");
      dispatch(createRecipe(finalObj));
    }
  };

  useEffect(() => {
    if(isSuccess && recipeAdded){
      setSuccessModalOpen(true);
      setTimeout(()=>{
        setSuccessModalOpen(false);
        dispatch(resetRecipeAdded());
        navigate("/home");
      },3000)
    };
    if(isError){

    }
  }, [isLoading, isError, isSuccess]);

  useEffect(() => {
    if(form?.healthScore > 99){
      console.log("exito");
      setReachMaxScore(true);
    }else{
      setReachMaxScore(false);
    }
  }, [form.healthScore]);

  useEffect(() => {
    dispatch(getDiets());
  }, []);

  return ( 
    <div className='add-recipe-main-wrapper position-relative'>
      <NavBar/>
      {modalOpen && <AddInfoModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>}
      {successModalOpen && <SuccessModal/>}
      <div className='add-recipe-wrapper'>
        <div className='add-label'>
          <div className='add-recipe-info-icon'>
            <img src="/images/info.svg" alt="abc" onClick={()=> setModalOpen(true)}/>
          </div>
          <p>Share your recipe with us! &nbsp;Don't be like grandmas...</p>
          {validation.alert && <span className='alert-span'>Oh! It looks like you have some empty fields. Please check it out before sharing your recipe!</span>}
        </div>
        <div className='add-form-div'>
          <form className='add-form' onSubmit={handleSubmit}>
            <div className='w-50 column'>
              <input type="text" name='name' placeholder='What is the name of your recipe?' onChange={handleChange} value={form.name} />
              {/* NAME VALIDATION */}
              {validation.name && <span className='validation-span'>Please tell us what is the name of your recipe</span>}
            </div>

            <div className='w-50 column'>
              <input type="text" name='summary' placeholder='Tell us a little about it' onChange={handleChange} value={form.summary} />
              {/* SUMMARY VALIDATION */}
              {validation.summary && <span className='validation-span'>Tell us about your recipe</span>}
            </div>

            <div className='w-50 column'>
              <input type="text" name='image' placeholder='Upload an image URL of the plate' onChange={handleChange} value={form.image} />
              
              {/* IMAGE VALIDATION */}
              {validation.image && <span className='validation-span'>Please share an image of your recipe with us</span>}
            </div>

            <div className='w-50 steps-plus'>
              <div className='d-flex align-items-center' style={{gap:"15px"}}>
                <img src="/images/plus.svg" alt="abc" onClick={handleAddStep}/>
                <img src="/images/minus.svg" alt="abc" onClick={handleMinus}/>
              </div>
              <div className='adding-steps'>
                <input type="text" placeholder='Step 1' name='1' onChange={handleStepChange1} value={step1.step}/>
                {stepsAdded > 1 && <input type="text" placeholder='Step 2' name='2' onChange={handleStepChange2} value={step2.step}/>}
                {stepsAdded > 2 && <input type="text" placeholder='Step 3' name='3' onChange={handleStepChange3} value={step3.step}/>}
                {stepsAdded > 3 && <input type="text" placeholder='Step 4' name='4' onChange={handleStepChange4} value={step4.step}/>}
              </div>
              {/* STEPS VALIDATION */}
              {validation.steps && <span className='validation-span'>Remember steps can not be empty!</span>}
            </div>
            <div className='w-50 nr-diet-div'>
                {diets.length && diets.map((el, index) => {
                  return (
                    <div key={index} className='nr-diet-list'>
                      <img src={el.image} alt="abc" name={el.name} width={30} height={30} onClick={handleDietIcon} />
                      <span>{el.name}</span>
                    </div>
                  )
                })}
            </div>
            {/* DIET VALIDATION */}
            {validation.diets && <span className='validation-span'>Which of these diets are related with your recipe?</span>}

            <div className='w-50 health-div'>
              <p>How healthy is this recipe?</p>
              <img src="/images/heart.svg" alt="abc" />
            </div>
            <div className="w-50 progress-container">
              <div className='progress-input-div'>
                <input type="range" min={0} max={100} defaultValue={0} name="healthScore" onChange={(e)=> setForm({...form, [e.target.name]: e.target.value})}/>
              </div>
              
              <span>{form?.healthScore}%</span>
              <HealthToast reachMax={reachMaxScore} setReachMax={setReachMaxScore}/>
            </div>
            <div className="ingre-title d-flex align-items-center">
                <img src="/images/cheese.svg" alt="abc" />
                <p>What ingredients do you use to make this recipe?</p>
                <img src="/images/bread.svg" alt="abc" />
            </div>
            <div className="add-ingredients w-50 d-flex justify-content-center">
                <textarea name="ingredients" id="ingredients" cols="60" rows="10" onChange={(e)=> setIngredients(e.target.value)}></textarea>
            </div>
              {/* INGREDIENTS VALIDATION */}
              {validation.ingredients && <span className='validation-span'>Please help other Cookers to know what ingredients they need</span>}


            <div className="ingre-title d-flex align-items-center">
              <img src="/images/kitchen2.svg" alt="abc" />
              <p>What equipment do you need?</p>
              <img src="/images/kitchen1.svg" alt="abc" />
            </div>
            <div className="add-ingredients w-50 d-flex justify-content-center">
                <textarea name="equipment" id="equipment" cols="60" rows="10" onChange={(e)=> setEquipment(e.target.value)}></textarea>
            </div>
              {/* EQUIPMENT VALIDATION */}
              {validation.equipment && <span className='validation-span'>What equipment Cookers need for this recipe?</span>}


            <div style={{paddingTop:"6rem"}} className='d-flex justify-content-end align-items-end w-80'>
            <button type='submit' className="button-82-pushable">
              <span className="button-82-shadow"></span>
              <span className="button-82-edge"></span>
              <span className="button-82-front text">
                Ready to Cook!
              </span>
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
   );
}
 
export default AddRecipe;