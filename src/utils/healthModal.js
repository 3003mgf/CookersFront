import React from 'react';

const HealthToast = ({reachMax, setReachMax}) => {

  return ( 
    <div className={`health-toast-wrapper d-flex align-items-center justify-content-center ${reachMax ? "active" : ""}`} onClick={()=> setReachMax(false)}>
      <div className="w-40">
        <img src="/images/healthToast.svg" alt="abc" />
      </div>
      <div className="w-60">
        <p className='ht-p1'>Congrats Cooker!</p>
        <p className='ht-p2'>It seems you have a very healthy recipe, thank you for sharing it with us!</p>
      </div>
    </div>
   );
}
 
export default HealthToast;