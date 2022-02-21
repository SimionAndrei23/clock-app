
import React, { useState, useEffect, useRef } from 'react'
import CheckIcon from '../files/checkIcon.webp'
import animationClock from '../files/clock-animation.json';
import animationAlarmRing from '../files/alarmRing.json';
import alarmRingTone from '../files/Alarm-ringtone.mp3';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import Lottie from 'react-lottie';
import { dataTabs } from '../sampleData/data'
import Fade from 'react-reveal/Fade';
import Timekeeper from 'react-timekeeper'; 
import DataAlarms from './DataAlarms';
import { useNavigate } from 'react-router-dom';


const ClockAddAlarm = () => {

    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('AddAlarm')
    const [addAlarm, setAddAlarm] = useState(false);
    const [time, setTime] = useState('10:00 am')
    const [doneButton ,setDoneButton] = useState(false)
    const [dataAlarms, setDataAlarms] = useState([
        {
            id: new Date(),
            date: '11:00 PM',
            setAlarm: false
        },
        {
            id: new Date(),
            date: '10:00 AM',
            setAlarm: false
        },
        {
            id: new Date(),
            date: '9:30 PM',
            setAlarm: false
        }
    ])

    const [getDataOfAlarm, setGetDataOfAlarm] = useState(null);
    const [isAlarmChecked, setIsAlarmChecked] = useState(false)
    const [statsAlarm ,setStatsAlarm] = useState()
    const [isNewAlarmChecked, setIsNewAlarmChecked] = useState(false);
    const [isAlarmDeleted, setIsAlarmDeleted] = useState(false);

    const refAudio = useRef(null)

    useEffect(() => {
        if(getDataOfAlarm !== null) {
            refAudio.current.play();
        }
        else {
            refAudio.current.pause();
        }
    },[getDataOfAlarm])

    const compare = (a,b) => {
        var time1 = parseFloat(a.date.replace(':','.').replace(/[^\d.-]/g, ''));
        var time2 = parseFloat(b.date.replace(':','.').replace(/[^\d.-]/g, ''));
        if(a.date.match(/.*pm/)) time1 += 12; if(b.date.match(/.*pm/)) time2 += 12;
        if (time1 > time2) return 1;
        if (time1 < time2) return -1;
        return 0;
    }

    const testSort = dataAlarms?.sort(compare);

    // const finalDataAlarms = testSort.filter((valueSort,index) => index === testSort.findIndex(element => element.date === valueSort.date));
    const finalDataAlarms = testSort.filter((valueSort,index) => testSort.indexOf(valueSort) === index);

    const closeModalAlarm = (e) => {
        if(e.target.classList.contains('alarmPopUPActive')) {
            setAddAlarm(false)
        }
    }

    const setButton = () => {
        setDoneButton(true)
        setAddAlarm(false)
        setDataAlarms(data => [...data, {
           id: new Date(),
           date: time,
           setAlarm: false
       }])                                                                                                                                                                                                                                                                                                                                                                                      
    }

    useEffect(() => {
        if(!addAlarm) {
            setDoneButton(false);
        }
    },[addAlarm])

    useEffect(() => {
        if(doneButton) {
            setIsNewAlarmChecked(!isNewAlarmChecked);
        }
    },[doneButton,isNewAlarmChecked])


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
       if(isAlarmChecked) {
        const timer = setTimeout(() => {
            setIsAlarmChecked(false)
        },2000)
        return () => clearTimeout(timer)
       }
     },[isAlarmChecked])

     useEffect(() => {
        if(isNewAlarmChecked) {
         const timer = setTimeout(() => {
             setIsNewAlarmChecked(false)
         },2000)
         return () => clearTimeout(timer)
        }
      },[isNewAlarmChecked])

      useEffect(() => {
        if(isAlarmDeleted) {
         const timer = setTimeout(() => {
             setIsAlarmDeleted(false)
         },2000)
         return () => clearTimeout(timer)
        }
      },[isAlarmDeleted])


    useEffect(() => {
        const alarms = JSON.parse(localStorage.getItem('alarms'))
        if(alarms) {
            setDataAlarms(alarms)
        }
    },[])


    useEffect(() => {
        localStorage.setItem('alarms', JSON.stringify(dataAlarms))
    },[dataAlarms])

    const defaultOptionsClock = {
        loop: true,
        autoplay: true, 
        animationData: animationClock,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const defaultOptionsAlarm = {
        loop: true,
        autoplay: true, 
        animationData: animationAlarmRing,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const dismissAlarm = () => {
           if(getDataOfAlarm !== null) {
                let copiedArr = [...dataAlarms];
                let alarmElement = {...getDataOfAlarm};
                alarmElement.setAlarm = false;
                const findIndex = dataAlarms?.findIndex(x => x.date === alarmElement.date);
                copiedArr[findIndex] = alarmElement;
                setDataAlarms(copiedArr);
           }

            setGetDataOfAlarm(null);
    }

    return (
        <div className = 'wrapperClock'>
            <div className = 'wrapperInside'>
                <div className="boxContent box1"></div>
                <div className="boxContent box2"></div>
                <div className="boxContent box3"></div>
                <header>          
                    <div>  
                        <Lottie
                            options = {defaultOptionsClock}
                            height = {40}
                            width = {40} 
                        />
                    </div> 

                    <div className = 'alarmSet'>
                        <p>Set your alarm, don't hesitate!</p>
                    </div>
                    <div onClick = {() => setAddAlarm(true)} className = 'plusWrapper'>
                        <IconButton><AddIcon fontSize = 'small' /></IconButton>
                    </div>
                </header>
                <div className = {`alarmTification ${isAlarmChecked ? 'active' : 'inactive'}`}>
                    <p> Your alarm will go off in {statsAlarm} </p>
                </div>
                <div className = {`alarmTification ${isNewAlarmChecked ? 'active' : 'inactive'}`}>
                    <p> You've added a new alarm! </p>
                </div>
                <div className = {`alarmTification ${isAlarmDeleted ? 'active' : 'inactive'}`}>
                    <p> You've removed an alarm! </p>
                </div>
                <div className = 'alarmsContainer'>
                    <>
                        {finalDataAlarms?.map((dataAlarm,index) => (
                            <DataAlarms key = {index} index = {index} id = {dataAlarm.id} dataAlarms = {dataAlarms} setDataAlarms = {setDataAlarms} alarmDate = {dataAlarm.date} alarmState = {dataAlarm.setAlarm} isAlarmChecked = {isAlarmChecked} setIsAlarmChecked = {setIsAlarmChecked} isAlarmDeleted = {isAlarmDeleted} setIsAlarmDeleted = {setIsAlarmDeleted} statsAlarm = {statsAlarm} setStatsAlarm = {setStatsAlarm} setGetDataOfAlarm = {setGetDataOfAlarm} />
                        ))}
                    </>
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
                                                    <span style = {{ color: '#f39fdc'}}> {dataValue.icon} </span>
                                                </div>
                                                ) : (
                                                    <span style = {{ color: 'gray'}}> {dataValue.icon} </span>
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
            <div onClick = {closeModalAlarm} className = {`${addAlarm ? 'alarmPopUPActive' : 'alarmPopUPInactive'}`}>
                <Fade>
                    <div className = 'containerClock'>
                        <Timekeeper
                            time = {time}
                            onChange = {(newTime) => setTime(newTime.formatted12.toString())}
                        />
                        <div onClick = {setButton} className = 'doneButton'>
                            <p>Done</p>
                            <div className = 'checkIcon'>
                                <img src = {CheckIcon} alt = 'checkIcon' />
                            </div>
                        </div>
                    </div>
                </Fade>
            </div>
            <div className = {`${getDataOfAlarm === null ? 'alarmIsOFF' : 'alarmIsON'}`}>
                <Fade>
                    <div className = 'containerAlarmON'>
                        <Lottie
                            options = {defaultOptionsAlarm}
                            height = {100}
                            width = {140} 
                        />
                       <audio ref = {refAudio} autoPlay loop>
                            <source src={alarmRingTone} />
                        </audio>
                        <div className = 'alarmDateAudio'>
                            <div className = 'alarmTime'>
                                <h2 style = {{textAlign: 'center'}}>{getDataOfAlarm?.date}</h2>
                            </div>
                            <label>
                                <input type = 'checkbox' id = 'checkInput' />
                                <span className = 'check1 checkTrue'></span>
                            </label>
                        </div>
                        <button onClick = {dismissAlarm} type = 'button'>Cancel</button>
                    </div>
                </Fade>
            </div>
        </div>
    )
}

export default ClockAddAlarm
