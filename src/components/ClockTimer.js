import React, { useEffect, useState } from 'react'
import stopWatchIcon from '../files/stopWatchIcon.webp'
import deadlineIcon from '../files/deadlineIcon.webp'
import Lottie from 'react-lottie';
import animationData from '../files/clock-animation.json';
import { dataTabs } from '../sampleData/data'
import { useNavigate } from 'react-router-dom';


const ClockTimer = () => {

    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('Timer')
    const [second, setSecond] = useState('00');
    const [minute, setMinute] = useState('00');
    const [isActive, setIsActive] = useState(false);
    const [counter, setCounter] = useState(0);

    useEffect(() => {

        let interval;

        if(isActive) {
            interval = setInterval(() => {
               const secondCounter = counter % 60;
               const minuteCounter = Math.floor(counter / 60);
               const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
               const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;

               setSecond(computedSecond);
               setMinute(computedMinute);

               setCounter(counter => counter + 1 );
           },1000)
        }

        return () => clearInterval(interval)

    },[isActive, counter])


    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const stopTimer = () => {

        setIsActive(false);
        setCounter(0);
        setSecond('00');
        setMinute('00')

    }

    const tabHandler = (name) => {

        setActiveTab(name)
    
        if(name === 'Access') {

            navigate('/')
    
        }
        else if(name === 'AddAlarm') {
    
            navigate('/addAlarm')
        }
        else if (name === 'Timer') {
            navigate('/clockTimer')
        }
    }

    return (
       <div className = 'wrapperClock'>
           <div className = 'wrapperInside wrapperInsideCircle'>
                <div className="boxContent box1"></div>
                <div className="boxContent box2"></div>
                <div className="boxContent box3"></div>
                <header>
                    <div>  
                        <Lottie
                            options = {defaultOptions}
                            height = {40}
                            width = {40} 
                        />
                    </div> 
                    <div className = 'alarmSet'>
                        <p>Track your time, now!</p>
                    </div>
                    <div></div>
                </header>
               <div className="timerWrapper">
                    <div className = 'timerStats'>
                        <span className = 'minute'>{minute}</span>
                        <span>:</span>
                        <span className = 'seconds'>{second}</span>
                    </div>
                    <div className = 'buttonsTimer'>
                        <button onClick={() => setIsActive(!isActive)}>{isActive ? 'Pause': 'Start'}</button>
                        <button onClick={stopTimer}>Reset</button>
                    </div>
                    <div className = 'containerBox container1'>
                        <img src = {stopWatchIcon} alt = 'StopwatchIcon' />
                    </div>
                    <div className = 'containerBox container2'>
                        <img src = {deadlineIcon} alt = 'StopwatchIcon' />
                    </div>
               </div>
                <div className = 'bottomTabs'>
                    <>
                        {dataTabs?.map((dataValue,index) => (
                            <div key = {index} className = 'tabWrapper'>
                                <ul key = {index} className = {`wrapperIcon ${dataValue.name === activeTab ? 'active' : 'inactive'}`}>
                                    <li onClick = {() => tabHandler(dataValue.name)} className = 'iconWrapper active'>
                                        {
                                            dataValue.name === activeTab ? 
                                            (
                                                <div className = 'nameIcon'>
                                                    <span style = {{ color: '#f39fdc'}}>{dataValue.icon}</span>
                                                </div>
                                            ) : (
                                                <span style = {{ color: 'gray'}}>{dataValue.icon}</span>
                                            )
                                        }
                                    </li>
                                </ul>
                                <p className = {`iconTitle ${dataValue.name === activeTab ? 'active' : ''}`}>{dataValue.name}</p>
                            </div>      
                        ))}
                    </>
                </div>
           </div>
       </div>
    )
}

export default ClockTimer
