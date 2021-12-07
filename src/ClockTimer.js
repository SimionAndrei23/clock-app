import React, { useEffect, useState } from 'react'
import stopWatchIcon1 from './files/stopwatch.png'
import stopWatchIcon2 from './files/deadline.png'
import Lottie from 'react-lottie';
import animationData from './files/clock-animation.json';
import { dataTabs } from './sampleData/data'
import { useHistory } from 'react-router-dom';


const ClockTimer = () => {

    const history = useHistory();

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

            history.push('/')
    
        }
        else if(name === 'AddAlarm') {
    
            history.push('/addAlarm')
        }
        else if (name === 'Timer') {
            history.push('/clockTimer')
        }
    }

    return (
       <div className = 'wrapperClock'>
           <div className = 'wrapperInside'>
                <header>
                    <div>  
                        <Lottie
                            options = {defaultOptions}
                            height = {40}
                            width = {40} 
                        />
                    </div> 
                    <div className = 'alarmSet'>
                        <p>Stopwatch for your moment!</p>
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
                        <img src = {stopWatchIcon1} alt = 'StopwatchIcon' />
                    </div>
                    <div className = 'containerBox container2'>
                        <img src = {stopWatchIcon2} alt = 'StopwatchIcon' />
                    </div>
               </div>
                <div className = 'bottomTabs'>
                    <>
                        {dataTabs?.map((dataValue,index) => (
                            <div className = 'tabWrapper'>
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
