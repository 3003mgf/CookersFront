import React from 'react';

const SuccessModal = () => {
  return ( 
    <article className='success-modal-article'>
      <div className='success-modal-div position-relative'>
        <img src="/images/chef-icon.svg" alt="abc" className='success-modal-img position-absolute' />
        <div className='sm-p1'>
          <p>Thank You Cooker!</p>
        </div>
        <div className='sm-p2'>
          <p>Your recipe was created successfully!</p>
        </div>
        <div className='d-flex justify-content-center align-items-center'>
          <img src="/images/pizza.svg" alt="abc" className='pizza' />
        </div>
      </div>
    </article>
   );
}
 
export default SuccessModal;