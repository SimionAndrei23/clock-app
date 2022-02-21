import React, { useEffect, useState} from 'react'
import Lottie from 'react-lottie';
import animationData from '../files/clock-animation.json';
import { dataTabs } from '../sampleData/data'
import { useNavigate } from 'react-router-dom';

const ClockAccess = () => {

    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('Access')
    const [defaultClock, setDefaultClock] = useState({ time: new Date() })

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const formatTime = (date) => {

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours > 12 ? 'PM' : 'AM'
            hours = hours % 12;
            hours = hours ? hours : 12
            minutes = minutes < 10 ? '0' + minutes : minutes
        let strTime = hours + ':' + minutes + ' ' + ampm;

        return strTime;
    
       }

       const date = new Date();

       const time = formatTime(date)

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
    
   useEffect(() => {

    let timeId = setInterval(() => {
        setDefaultClock({
            time: new Date()
        })
    },1000)
    return () => clearInterval(timeId)
   },[])
   
    return (
            <div className="wrapperClock">
                <div className="wrapperInside wrapperInsideCircle">
                    <div className="boxContent box1"></div>
                    <div className="boxContent box2"></div>
                    <div className="boxContent box3"></div>
                     <header>
                        <div className = 'lottieWrapper'>  
                            <Lottie
                                options = {defaultOptions}
                                height = {40}
                                width = {40} 
                            />
                        </div> 
                       <div className = 'quoteAlarm'><p>Time is precious, hurry up!</p></div>
                       <div></div>
                     </header>
                     <div className="clockWrapper">
                            <div className="clock">
                                <div className="hour_hand" style = {{transform: `rotateZ(${defaultClock.time.getHours() * 30}deg)`}}></div>
                                <div className="minute_hand" style = {{transform: `rotateZ(${defaultClock.time.getMinutes() * 6}deg)`}}></div>
                                <div className="second_hand"  style = {{transform: `rotateZ(${defaultClock.time.getSeconds() * 6}deg)`}}></div>
                                <span className="twelve">12</span>
                                <span className="one">1</span>
                                <span className="two">2</span>
                                <span className="three">3</span>
                                <span className="four">4</span>
                                <span className="five">5</span>
                                <span className="six">6</span>
                                <span className="seven">7</span>
                                <span className="eight">8</span>
                                <span className="nine">9</span>
                                <span className="ten">10</span>
                                <span className="eleven">11</span>
                            </div>
                     </div>
                        <div className = 'time'>
                            <h3>{time}</h3>
                        </div>
                        <div className = 'bottomTabs'>
                           <>
                            {dataTabs?.map((dataValue,index) => (                         
                                <div key = {index} className = 'tabWrapper'>
                                   <ul onClick = {() => tabHandler(dataValue.name)} className = {`wrapperIcon ${dataValue.name === activeTab ? 'active' : 'inactive'}`}>
                                        <li className = 'iconWrapper active'>
                                            {
                                                dataValue.name === activeTab ? (
                                                    <div className = 'nameIcon'>
                                                        <span style = {{ color: '#f39fdc'}}>{dataValue.icon}</span>
                                                    </div>
                                                ) : (
                                                    <span style = {{ color: 'gray'}}> {dataValue.icon} </span>
                                                )
                                            }
                                        </li>
                                    </ul>
                                    <p className = {`iconTitle ${dataValue.name === activeTab && 'active'}`}>{dataValue.name}</p>
                                </div>                            
                            ))}
                           </>
                        </div>
                </div>
            </div>
    )
}

export default ClockAccess
