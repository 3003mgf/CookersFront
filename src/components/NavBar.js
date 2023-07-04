import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getRecipes, getRecipesByName } from '../features/mainSlice';

const NavBar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [theme, setTheme] = useState("light");
  const [input, setInput] = useState(null);


  const handleTheme = (e) =>{
    if(e.target.checked){
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    }else{
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  const handleRecipesByName = (e) =>{
    if(input){
      dispatch(getRecipesByName(input));
    }else{
      dispatch(getRecipes());
    }
  };


  useEffect(() => {
    const validateTheme = localStorage.getItem("theme");
    if(!validateTheme){
      localStorage.setItem("theme", "light");
    }else{
      setTheme(validateTheme);
    }
  }, []);

  return ( 
    <div className={`navbar-wrapper ${theme === "dark" ? "dark" : ""}`}>
      <div className='chef-icon'>
        <div>
          <img src="/images/chef-icon.svg" alt="abc" onClick={()=> navigate("/home")}/>
        </div>
        <div>
          <span style={{color: theme === "dark" ? "white" : "#777777"}}>Cookers</span>
        </div>
      </div>
      <div className='navbar-input d-flex align-items-center position-relative'>
        <input type="text" placeholder='Search recipes here...' disabled={window.location.href !== "https://cookers-mgf.netlify.app/home" ? true : false} className={`position-relative`} onChange={(e)=> setInput(e.target.value)} value={input} style={{boxShadow: theme === "dark" ? "none" : "0 0 0.5rem lightgrey", backgroundColor:"white"}} onKeyDown={(e)=> e.key === "Enter" && handleRecipesByName()}/>
        {window.location.href === "https://cookers-mgf.netlify.app/home" && <div className='nav-bar-search position-absolute'>
          <img src="/images/search.svg" alt="abc" width={25} height={25} onClick={handleRecipesByName}/>
        </div>}
      </div>
      <div className='navbar-icons'>
        <div className="button-slide-g">
          <div className='navbar-icons-div-g' onClick={()=> window.open("https://github.com/3003mgf", "window", "width=800, height=800")}>
            <img src="/images/githubWhite.svg" alt="" />
          </div>
          <span>Github</span>
        </div>
        <div className='button-slide-l'>
          <div className='navbar-icons-div-l' onClick={()=> window.open("https://www.linkedin.com/in/marcelo-cruz-ignacio-gramajo-feijoo-03932b257/", "window", "width=800, height=800")}>
            <img src="/images/linkedin.svg" alt="" />
          </div>
          <span>Linkedin</span>
        </div>
        <div className='button-slide-s'>
          <div className='navbar-icons-div-s' onClick={()=> window.open("https://app.slack.com/client/TPRS7H4PN/CUQFWT8CF/rimeto_profile/U04H3MS3A2H", "window", "width=800, height=800")}>
            <img src="/images/slack.svg" alt="" />
          </div>
          <span>Slack</span>
        </div>
      </div>
      <div className='new-recipe'>
        <button onClick={()=> navigate("/add-recipe")}>Add Recipe</button>
        <div className="checkbox-wrapper-54">
          <label className="switch">
            <input type="checkbox" onChange={handleTheme} checked={theme === "dark" ? true : false}/>
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
   );
}
 
export default NavBar;