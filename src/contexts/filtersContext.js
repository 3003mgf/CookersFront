import { createContext, useState } from "react";

export const FilterContext = createContext();

export const FilterProvider = ({children}) =>{
  const [resetHover, setResetHover] = useState(false);
  const [infoHover, setInfoHover] = useState(false);
  const [pageStart, setPageStart] = useState(0);
  const [pageLimit, setPageLimit] = useState(9);


  const data = {
    resetHover, 
    setResetHover, 
    infoHover, 
    setInfoHover,
    pageStart,
    setPageStart,
    pageLimit,
    setPageLimit
  };

  return <FilterContext.Provider value={data}>{children}</FilterContext.Provider>
};