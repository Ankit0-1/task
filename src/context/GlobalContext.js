import React, { useState } from "react";
import { createContext, useReducer } from "react";
import { CORRECT, INCORRECT, DATA_UPDATE, RESET_ALL } from "../actions/actionsType";

export const myContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
      case CORRECT:
        return { ...state, right: state.right + 1, count: state.count+1 };
      case INCORRECT:
        return { ...state, wrong: state.wrong + 1, count: state.count+1 };
      case DATA_UPDATE:
        return  {...state, data: action.payload}
      case RESET_ALL:
        return {...state, count: 0, right:0, wrong:0, data:0}
      default:
        throw new Error();
    }
  }
  const initialState = {
    count: 0,
    right: 0,
    wrong: 0,
    data: '',
}  

export const GlobalContext = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchData = async () => {
        try {
            const respose = await fetch('https://opentdb.com/api.php?amount=1');

            const data = await respose.json();
            const result = data?.results?.[0]
            if(result){
            dispatch({ 
                type: DATA_UPDATE, 
                payload: {
                    result
            }})
          }
          return result
        }catch(err){
            console.log('something went wrong api issue', err)
        } 
    };
    
    const resetAll = () => {
      dispatch({ type: RESET_ALL});
      fetchData();
    }
    return( <myContext.Provider value={{ ...state, dispatch, fetchData, resetAll}} >
        {props.children}
    </myContext.Provider>)
}

