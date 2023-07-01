import React from 'react';

const AddInfoModal = ({modalOpen, setModalOpen}) => {
  return ( 
    <article className="add-info-modal-article">
      <div className="add-info-modal-div">
        <button onClick={()=> setModalOpen(false)}>X</button>
        <div className="add-info-modal-details">
          <div>
            <img src="/images/chef-assistant.jpg" alt="abc" />
          </div>
          <p className='d-flex justify-content-center add-im-title'>Cookers Chef's Assistant</p>
          <div className='add-im-subdetails'>
            <p>Hey Cooker!</p>
            <p>The main Chef sent me just to let you know that when you provide the ingredients and equipment, separate them with a coma. <br /><br /> For example: <b>Salt, Celery, Bread, Cheese</b></p>
          </div>
        </div>
      </div>
    </article>
   );
}
 
export default AddInfoModal;