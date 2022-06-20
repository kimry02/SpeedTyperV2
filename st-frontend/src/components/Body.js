import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { update } from '../actions/auth.js';

const Body = (props) => {
    //STARTS HERE

    const [started, startedSetter] = React.useState();
    const [cwpm, wpmSetter] = React.useState(0);
    const [finishedStatus, finishedStatusSetter] = React.useState();
    const [timeActive, timeActiveSetter] = React.useState();
    const [charTyped, charTypedCounter] = React.useState(0);
    const [globalQuote, globalQuoteSetter] = React.useState("");
    const [startTime, startTimeSetter] = React.useState();
    const [errorCount, errorCountSetter] = React.useState(0);

    const quoteElement = React.useRef(null);
    const inputElement = React.useRef(null);
    const wpmRef = React.useRef(null);
    const errorRef = React.useRef(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])


    function timer() {
        timeActiveSetter(true);
    }

    React.useEffect(()=>{
        var woo = Math.floor((charTyped*4) / (Math.floor((new Date() - startTime) / 1000) / 60));
        if(isNaN(woo)){
            wpmRef.current.innerText = 0;
        }
        else{
        wpmRef.current.innerText = Math.floor((charTyped/5) / (Math.floor((new Date() - startTime) / 1000) / 60));
        }
    }, [charTyped, startTime]);

    // Need once logged in...
    React.useEffect(()=>{
        if(finishedStatus){
            if(user){
                const oldRC = parseInt(user.result.raceCount);
                const newRC = parseInt(user.result.raceCount) + 1;
                const newWPM = Math.floor((parseInt(user.result.wpm)*oldRC + cwpm) / newRC); 
                dispatch(update(user.result.username, newWPM, newRC,navigate))
                navigate('/')
            }
        }
    },[finishedStatus, cwpm, dispatch, navigate, user])

    function getQuote() {
        return fetch('https://api.quotable.io/random')
            .then(response => response.json())
            .then(data => data.content)
            .catch(err => console.log("couldn't get quote"))
    }
    
    function keystrokes() {
        if(!timeActive){
            startTimeSetter(new Date());
            timer();
            wpmRef.current.innerText = 0;
            errorRef.current.innerText = 0; 
        }
        charTypedCounter(prev => prev + 1);
        const arrayQuote = quoteElement.current.querySelectorAll('span');
        const arrayValue = inputElement.current.value.split('');
        let correct = true;
        arrayQuote.forEach((characterS, index) => {
            const character = arrayValue[index]
            if(character == null) {
                characterS.classList.remove('correct')
                characterS.classList.remove('incorrect')
                correct = false;
            }
            else if (character === characterS.innerText) {
                characterS.classList.add('correct');
                characterS.classList.remove('incorrect')
            }
            else{
                characterS.classList.remove('correct')
                characterS.classList.add('incorrect')
                errorRef.current.innerText = parseInt(errorRef.current.innerText) + 1;
                correct = false;
            }
        })
        if(correct){
            finishedStatusSetter(true);
            startedSetter(false);
            wpmSetter(parseInt(wpmRef.current.innerText));
            timeActiveSetter(false);
            errorCountSetter(parseInt(errorRef.current.innerText));
        }
    }

    async function changeStarted() {
        var stringo = await getQuote();
        charTypedCounter(0);
        globalQuoteSetter(stringo);
        startedSetter(true);
        timeActiveSetter(false);
        wpmRef.current.innerText = 0;
        errorRef.current.innerText = 0; 
    }

    React.useEffect(()=>{
        if(started){
            globalQuote.split('').forEach(character => {
                const characterS = document.createElement('span');
                characterS.innerText = character;
                quoteElement.current.appendChild(characterS);
            })
        }
    },[started, globalQuote]);
    
    if(!started){
        return (
        <div className="grid grid-rows-[60vh_20vh]">
            <div onClick={changeStarted} className="text-white mx-auto my-auto hover:cursor-pointer mt-20 p-2 px-4 text-[2rem] shadow-lg bg-[#00233b] rounded-lg text-center">
                    CLICK TO BEGIN
            </div>
            <div className="rounded-lg bg-[#00233b] w-1/2 h-[15vh] mx-auto row-start-2 row-end-3">
                <div className="flex place-content-evenly pt-3">
                    <div className="text-[#F4D47E] text-5xl text-center flex flex-col">
                        WPM
                        <span ref={wpmRef} className="pt-3">0</span>
                    </div>
                    <div className="text-[#F4D47E] text-5xl text-center flex flex-col">
                        ERRORS
                        <span ref={errorRef} className="pt-3">{errorCount}</span> 
                    </div>
                </div>
            </div>
        </div>
        )
    }
    else{
    return (
        <div className="grid grid-rows-[60vh_20vh]">
            <div ref={quoteElement} onClick={() => {inputElement.current.focus()}} id="quote" className="p-10 text-[4rem] text-[#777777] break-words text-center">
            </div>
            <textarea ref={inputElement} onChange={keystrokes} id="input" className="text-[1px] text-[#00233b] bg-transparent outline-none bg-[#00233b]" defaultValue="">
            </textarea>
            <div className="rounded-lg bg-[#00233b] w-1/2 h-[15vh] mx-auto row-start-2 row-end-3">
                <div className="flex place-content-evenly pt-3">
                    <div className="text-[#F4D47E] text-5xl text-center flex flex-col">
                        WPM
                        <span ref={wpmRef} className="pt-3">0</span>
                    </div>
                    <div className="text-[#F4D47E] text-5xl text-center flex flex-col ">
                        ERRORS
                        <span ref={errorRef} className="pt-3">0</span> 
                    </div>
                </div>
            </div>
        </div>
        
    )
    }
}

export default Body;