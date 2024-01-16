    import React, { useContext, useEffect, useState } from "react";
    import { myContext } from "../context/GlobalContext";
    import Questions from './Questions';
    import { redirect, useNavigate } from "react-router-dom";
    import { ToastContainer, toast } from "react-toastify";
    import "react-toastify/dist/ReactToastify.css";
    import CommonButton from "./CommonButton";



    const FrontPage = () => {
        const { count, right, wrong, data, dispatch, fetchData, resetAll } = useContext(myContext);
        const [loadingStatus, setloadingStatus] = useState(false);
        const [disable, setDisable] = useState(false);
        const [nextButtonDisable, setNextButtonDisable] = useState(true);
        const navigate = useNavigate();

        const handleNextQuestionClick = async () => {
            setloadingStatus(true);
            if(count ==10){
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

        const disableAndEnableButton = () =>{
            setDisable(true);
            setTimeout(() => {
                setDisable(false);
            }, 5000)
        }

        const handleResetClick  = () => {
            setloadingStatus(true);
            if(disable){
                showDisableWarning() 
            }else{
                resetAll()
                disableAndEnableButton()
                setloadingStatus(false);
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
                setTimeout(() => {
                    setloadingStatus(false);
                }, 1000) 
        }
        const changeLoadingStatus = (value) => {
            setloadingStatus(value);
        }
        return (
            <div className="app-container make-flex">
                <h2>Trivia Questions & Answers</h2>
                <Questions 
                    loadingStatus={loadingStatus} 
                    changeLoadig={(value) => changeLoadingStatus(value)} 
                    disableAndEnableButton={disableAndEnableButton}
                    setNextButtonDisable={setNextButtonDisable}
                />
                <div className="score-container twidth make-flex">
                    <div className="score make-flex">
                        <p className="right-answer">{right}</p>
                        <p className=" wrong-answer">{wrong}</p>
                    </div>
                    <div className="score make-flex">
                        <CommonButton
                            className={'resetscore'}
                            onClick={() => handleResetClick()}
                            label={'Restart Game!'}
                        ></CommonButton>
                        <CommonButton
                            className={`next-button ${nextButtonDisable && 'disable'}`} 
                            onClick={() => handleNextQuestionClick()}
                            disabled={nextButtonDisable}
                            label={count == 10 ? 'Show Result' : 'Next Question'}
                        ></CommonButton>
                        
                    </div>
                </div>
                <CommonButton
                    id='skip'
                    className={'twidth'}
                    onClick={() => handleNextQuestionClick()}
                    // disabled={disable}
                    label={'Skip Question'}
                ></CommonButton>
                <ToastContainer />
                <span className="questions-left">Questions left: {10 - count}</span>
                <small>&copy; 2024 Ankit Rathore</small>
            </div>
        );
    };

    export default FrontPage;
