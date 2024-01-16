import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { myContext } from "../context/GlobalContext";
import  Loader  from "../utils/Loader";
import Shimmer from "../utils/Shimmer";

const Questions = ({loadingStatus, changeLoadig, disableAndEnableButton, setNextButtonDisable}) => {
    const { count, right, wrong, data, dispatch, fetchData } = useContext(myContext);
    const { incorrect_answers = [], correct_answer = '', question = '' } = data?.result || {};
    const [optionSelected, setOptionSelected] = useState({ isSelected: false, selectedAnswer: '' });
    const [suffledOption, setSuffledOption] = useState([]);
    // const [loadingStatus, changeLoadig] = useState(loading);

    const shuffleArray = array => {
        const shuffledArray = [...array, correct_answer];

        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = shuffledArray[i];
            shuffledArray[i] = shuffledArray[j];
            shuffledArray[j] = temp;
        }
        setSuffledOption(shuffledArray);
    }

    const handleAnswerClick = (valueSelected) => {
        setOptionSelected(prevState => ({
            ...prevState,
            isSelected: true,
            selectedAnswer: valueSelected
        }))
        valueSelected === correct_answer ? dispatch({ type: 'correct' }) : dispatch({ type: 'incorrect' });
        setNextButtonDisable(false);
    }

    useEffect(() => {
        const fetchDataWrapper = async () => {
            changeLoadig(true);
            await fetchData();
            changeLoadig(false);

            shuffleArray(incorrect_answers);
            setOptionSelected({ isSelected: false, selectedAnswer: '' });
        }
        fetchDataWrapper();
    }, []);  
   
    useEffect(() => {
        // This useEffect runs whenever 'data' changes
        if (data?.result) {
            disableAndEnableButton();
          shuffleArray(incorrect_answers);
          setOptionSelected({ isSelected: false, selectedAnswer: '' });
        }
        setNextButtonDisable(true);
      }, [data]); // Dependency array includes 'data'

    const optionToShow =
     loadingStatus ? (
        <Shimmer />
    ) : ( 
        suffledOption.map((option, index) => (
            <div key={'optn' + index} className="answer-container">
              <p
                className={
                  optionSelected.isSelected
                    ? option === correct_answer
                      ? 'answer correct disabled-paragraph'
                      : 'answer incorrect disabled-paragraph'
                    : 'answer'
                }
                onClick={() => handleAnswerClick(option)}
                dangerouslySetInnerHTML={{
                  __html: `${option}
                    ${
                      optionSelected.isSelected &&
                      optionSelected.selectedAnswer === option
                        ? `<span class="answer-status">${
                            option === correct_answer ? '✔' : '✘'
                          }</span>`
                        : ''
                    }`,
                }}
              ></p>
            </div>
          ))          
    );

    return (
        <div className="container twidth make-flex">
             <p id="question" dangerouslySetInnerHTML={{ __html: loadingStatus ? 'Loading...' : question }}></p>
            <div className="optnContainer make-flex">
                {optionToShow}
            </div>
        </div>
    );
}

export default Questions;
