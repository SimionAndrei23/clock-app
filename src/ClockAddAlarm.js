import React, { useState, useRef, useEffect } from 'react'
import check from './files/check.png'
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import Lottie from 'react-lottie';
import animationClock from './files/clock-animation.json';
import { dataTabs } from './sampleData/data'
import Fade from 'react-reveal/Fade';
import Timekeeper from 'react-timekeeper'; 
import DataAlarms from './DataAlarms';
import { useHistory } from 'react-router-dom';


const ClockAddAlarm = () => {

    const history = useHistory();


    const [activeTab, setActiveTab] = useState('AddAlarm')
    const [addAlarm, setAddAlarm] = useState(false);
    const [time, setTime] = useState('10:00 AM')
    const [doneButton ,setDoneButton] = useState(false)
    const [dataAlarms, setDataAlarms] = useState([
        {
            date: '6-12-2021 10:00 AM'
        },
        {
            date: '6-12-2021 8:15 AM'
        },
        {
            date: '6-12-2021 9:30 AM'
        }
    ])

    const [checked, setChecked] = useState(false)
    const [isAlarmChecked, setIsAlarmChecked] = useState(false)
    const [statsAlarm ,setStatsAlarm] = useState()

    const dateCurrent = new Date();

    let day = dateCurrent.getDate();
    let month = dateCurrent.getMonth() + 1;
    let year = dateCurrent.getFullYear();
    let today = day + '-' + month + '-' + year;

    const dateSelectedSplit = today.split('');
    const charSelected = dateSelectedSplit.push(' ' + time);
    const finalSelectedDate = dateSelectedSplit.join('');

    const closeModalAlarm = (e) => {
        if(e.target.classList.contains('alarmPopUPActive')) {
            setAddAlarm(false)
        }
    }

    const setButton = () => {
        setDoneButton(true)
        setAddAlarm(false)
       setDataAlarms(data => [...data, {
           date: finalSelectedDate
       }])                                                                                                                                                                                                                                                                                                                                                                                               
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

    useEffect(() => {
       if(isAlarmChecked) {
        const timer = setTimeout(() => {
            setIsAlarmChecked(false)
        },2000)
        return () => clearTimeout(timer)
       }
     },[isAlarmChecked])

    useEffect(() => {
        const alarms = localStorage.getItem('alarms')
        if(alarms) {
            setDataAlarms(JSON.parse(alarms))
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

    return (
        <div className = 'wrapperClock'>
            <div className = 'wrapperInside'>
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
                    <p>Your alarm will go off in {statsAlarm}</p>
                </div>
                <div className = 'alarmsContainer'>
                    <>
                        {dataAlarms?.map((dataAlarm,index) => (
                            <DataAlarms key = {index} alarmDate = {dataAlarm.date} checked = {checked} setChecked = {setChecked}setIsAlarmChecked = {setIsAlarmChecked} setStatsAlarm = {setStatsAlarm} />
                        ))}
                    </>
                </div>

                <div className = 'bottomTabs'>
                    <>
                        {dataTabs?.map((dataValue,index) => (
                            <div key = {index} className = 'tabWrapper'>
                                <ul onClick = {() => tabHandler(dataValue.name)} key = {index} className = {`wrapperIcon ${dataValue.name === activeTab ? 'active' : 'inactive'}`}>
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
                                <img src = {check} />
                            </div>
                        </div>
                    </div>
                </Fade>
            </div>
        </div>
    )
}

export default ClockAddAlarm
