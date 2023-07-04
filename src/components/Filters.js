import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDiets, getRecipes, getRecipesSortedByCreated, getRecipesSortedByDiet, getRecipesSortedByHealth, getRecipesSortedByName } from '../features/mainSlice';
import { FilterContext } from '../contexts/filtersContext';
import { InfoModal } from '../utils/filtersModal';


const Filters = () => {
  
  const navigate = useNavigate();
  const refSelect = useRef();
  const refOption = useRef();
  const refSelect2 = useRef();
  const refOption2 = useRef();
  const refSelect3 = useRef();
  const refOption3 = useRef();
  const refSelect4 = useRef();
  const refOption4 = useRef();
  const dispatch = useDispatch();
  const state = useSelector(state => state.mainData);
  const { diets } = state;

  const [modalOpen, setModalOpen] = useState(false);

  // ICONS HANDLER
  const data = useContext(FilterContext);
  const { resetHover, setResetHover, infoHover, setInfoHover, setPageStart, setPageLimit } = data;

  const handleCloseModal = () =>{
    setModalOpen(false);
    setResetHover(false);
    setInfoHover(false);
  }


  // FILTER ACTION
  const sortAlphabetically = (e) =>{
    dispatch(getRecipesSortedByName(e.target.value));
    setPageStart(0);
    setPageLimit(9);
  };

  const sortByHealth = (e) =>{
    dispatch(getRecipesSortedByHealth(e.target.value));
    setPageStart(0);
    setPageLimit(9);
  };

  const sortByCreated = (e) =>{
    dispatch(getRecipesSortedByCreated(e.target.value));
    setPageStart(0);
    setPageLimit(9);
  };

  const sortByDiet = (e) =>{
    dispatch(getRecipesSortedByDiet(e.target.value));
    setPageStart(0);
    setPageLimit(9);
  };

  // RESET FILTERS

  const resetFilters = () =>{
    refSelect.current.value = refOption.current.value;
    refSelect2.current.value = refOption2.current.value;
    refSelect3.current.value = refOption3.current.value;
    refSelect4.current.value = refOption4.current.value;
    setPageStart(0);
    setPageLimit(9);
    dispatch(getRecipes());
  };

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
  }, []);
  
  return ( 
    <div className='filters-wrapper'>
      {modalOpen && <InfoModal handleCloseModal={handleCloseModal} setInfoHover={setInfoHover} setResetHover={setResetHover}/>}
      <div className='filters-container'>
        <div className={`filter-info ${infoHover ? "active" : ""}`}>
          <img src="images/info.svg" alt="abc" onClick={()=> setModalOpen(true)}/>
        </div>
        <div className='filters-select'>
          <select ref={refSelect} name="" id="" onChange={sortAlphabetically} defaultValue="disabled">
            <option ref={refOption} value="disabled" disabled>Alphabetically</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
        <div className='filters-select'>
          
          <select ref={refSelect2} name="" id="" defaultValue="disabled" onChange={sortByDiet}>
            <option ref={refOption2} value="disabled" disabled>Select Diet</option>
            <option value="default">Default</option>
            {diets.length && diets.map((el, index) => <option key={index} value={el.name}>{el.name}</option>)}
          </select>
        </div>
        <div className='filters-select'>
          <select ref={refSelect3} name="" id="" defaultValue="disabled" onChange={sortByHealth}>
            <option ref={refOption3} value="disabled" disabled>Health Score</option>
            <option value="default">Default</option>
            <option value="best">Best to Worst</option>
            <option value="worst">Worst to Best</option>
          </select>
        </div>
        <div className='filters-select'>
          <select ref={refSelect4} name="" id="" defaultValue="disabled" onChange={sortByCreated}>
            <option ref={refOption4} value="disabled" disabled>Created In</option>
            <option value="mix">Mix</option>
            <option value="api">API</option>
            <option value="db">Created By People</option>
          </select>
        </div>
        <div className='reset-filters' >
          <img src="images/reset.svg" alt="abc" className={`${resetHover ? "active" : ""}`} onClick={resetFilters}/>
        </div>
      </div>
    </div>
   );
}
 
export default Filters;