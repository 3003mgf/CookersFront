import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  const handleEnter = () =>{
    setTimeout(()=>{
      navigate("/home");
    },500)
  };

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
        <div style={{width:"60%"}} className='welcome-img'>
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