import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { myContext } from "../context/GlobalContext";
import  Loader  from "../utils/Loader";
import Shimmer from "../utils/Shimmer";

const Questions = ({loading}) => {
    const { count, right, wrong, data, dispatch, fetchData } = useContext(myContext);
    const { incorrect_answers = [], correct_answer = '', question = '' } = data?.result || {};
    const [optionSelected, setOptionSelected] = useState({ isSelected: false, selectedAnswer: '' });
    const [suffledOption, setSuffledOption] = useState([]);
    const [loadingStatus, setloadingStatus] = useState(loading);

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
    }

    useEffect(() => {
        const fetchDataWrapper = async () => {
            setloadingStatus(true);
            await fetchData();
            setloadingStatus(false);
        }
    
        shuffleArray(incorrect_answers);
        setOptionSelected({ isSelected: false, selectedAnswer: '' });
        fetchDataWrapper();
    }, [data?.result]);  
   
    console.log(data)

    const optionToShow =
    //  loadingStatus ? (
    //     <Shimmer />
    // ) : (
        suffledOption.map((option, index) => (
            <div key={'optn' + index} className="answer-container">
                <p
                    className={optionSelected.isSelected ? (option === correct_answer ? 'answer correct disabled-paragraph' : 'answer incorrect disabled-paragraph') : 'answer'}
                    onClick={() => handleAnswerClick(option)}
                >
                    {option}
    
                    {optionSelected.isSelected && optionSelected.selectedAnswer === option && (
                        <span className="answer-status">
                            {option === correct_answer ? '✔' : '✘'}
                        </span>
                    )}
                </p>
            </div>
        ))
    // );

    return (
        <div className="container twidth make-flex">
            {/* <p id="question">{loadingStatus ? 'Loading...' : question}</p> */}
            <div className="optnContainer make-flex">
                {optionToShow}
            </div>
        </div>
    );
}

export default Questions;
