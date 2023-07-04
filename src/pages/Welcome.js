import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getRecipes } from '../features/mainSlice';

const Welcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEnter = () =>{
    setTimeout(()=>{
      navigate("/home");
    },500)
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  return ( 
    <div className='welcome-wrapper'>
      <div class="wrapper">
        <ul class="dynamic-txts">
          <li><span>Estas listo para comer?</span></li>
          <li><span>Me muero de hambre...</span></li>
          <li><span>Comparte tu receta con nosotros!</span></li>
          <li><span>Planeas cocinar?</span></li>
        </ul>
      </div>
      <div className="welcome-container">
        <div className='welcome-img'>
          <img src="images/chef.jpg" alt="abc" />
        </div>
        <div className='welcome-btn-div' style={{width:"40%"}}>
          <button className="welcome-btn" onClick={handleEnter}>Enter</button>
        </div>
      </div>
    </div>
   );
}
 
export default Welcome;