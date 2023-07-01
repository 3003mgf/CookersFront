import React from 'react';

export const InfoModal = ({handleCloseModal, setResetHover, setInfoHover}) =>{
  return(
    <article className="info-modal-article position-relative" onClick={handleCloseModal}>
      <div className="info-modal-div position-absolute" onClick={(e)=> e.stopPropagation()}>
        <button onClick={handleCloseModal}>X</button>
        <div className='info-modal-details'>
          <div className="md-img">
            <img src="images/chefModal.jpg" alt="abc" style={{width:"300px", height:"auto"}} />
          </div>
            <span className='md-title'>Cookers Chef</span>
          <div className='md-details'>
            <p className='md-subtitle'>Hi Cooker! Are you hungry?</p>
            <p className='md-desc'>I just want to give you some quick guide about the funcionality of this page!</p>
            <p className='info-modal-reset d-flex align-items-center' style={{paddingTop:"1.3rem", gap:"10px"}}><img src="images/reset.svg" alt="abc" width={30} height={30} onPointerOver={()=> setResetHover(true)} onPointerLeave={()=> setResetHover(false)}/> Reset your filters</p>
            <p style={{paddingBottom:"3rem", paddingTop:"0.5rem", gap:"10px"}} className='d-flex align-items-center'><img src="images/info.svg" alt="abc" onPointerOver={()=> setInfoHover(true)} onPointerLeave={()=> setInfoHover(false)}/> You will find me again!</p>
            <p className='md-bold'><b>Recipe Card</b></p>
            <p className='md-subdesc'>As you see, each card contains the type of diet the recipe belongs to, don't forget to scroll to be able to see the full list of diets!</p>
            <p className='md-bold' style={{marginTop:"3.5rem"}}><b>Search Bar</b></p>
            <p className='md-subdesc'>The Search Bar will only be available at Home page. If you are trying to add a recipe, or see a recipe in full details, you'll notice the Search Bar is disabled.</p>
            <p className='md-final'>This being said, I let you keep looking recipes, Au revoir! <img src="images/bowl.svg" alt="abc" /></p>
          </div>
        </div>
      </div>
    </article>
  )
};