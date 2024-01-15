import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../context/GlobalContext";
import Questions from './Questions';
import { redirect, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const FrontPage = () => {
    const { count, right, wrong, data, dispatch, fetchData, resetAll } = useContext(myContext);
    const [loadingStatus, setloadingStatus] = useState(false);
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate();

    const handleNextQuestionClick = async () => {
        if(count ===2){
            navigate('/results')
        } 
        else if(disable){
            showDisableWarning();
        }
        else {
            disableAndEnableButton()
            setloadingStatus(true);
            await fetchData();
            // dispatch({type: 'nextquestion'})
            setloadingStatus(false);
        }
    }

    const  disableAndEnableButton = () =>{
        setDisable(true);
        setTimeout(() => {
            setDisable(false);
        }, 4000)
    }

    const handleResetClick  = () => {
        if(disable){
            showDisableWarning() 
        }else{
            disableAndEnableButton()
            resetAll()
        }
    }
    
    const showDisableWarning = () => {
        toast.warn('please wait for atleast 5 sec before trying next', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
            });
    }
    return (
        <div className="app-container make-flex">
            <h2>Trivia Questions & Answers</h2>
            <Questions loaging={false}/>
            <div className="score-container twidth make-flex">
                <div className="score make-flex">
                    <p className="right-answer">{right}</p>
                    <p className=" wrong-answer">{wrong}</p>
                </div>
                <div className="score make-flex">
                    <p className={`resetscore ` } onClick={() => handleResetClick()} title={disable ? 'Button is disabled until you read the question' : ''}>Restart Game!</p>
                    <p className={`next-button `} onClick={handleNextQuestionClick}  title={disable ? 'Button is disabled until you read the question' : ''}>
                       {count === 2 ? 'Show Result' : 'Next Question'}
                    </p>
                </div>
            </div>
            <p
                id="skip"
                className={`twidth `}
                onClick={() => handleNextQuestionClick()}
                disabled={disable}
                title={disable ? 'Button is disabled until you read the question' : ''}
            >
                Skip Question
            </p>
            <ToastContainer />
            <small>&copy; 2024 Ankit Rathore</small>
        </div>
    );
};

export default FrontPage;
