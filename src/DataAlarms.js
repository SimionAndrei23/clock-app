import React, { useEffect, useState, useRef } from 'react'


const DataAlarms = ({index,alarmDate,checked,setChecked,setIsAlarmChecked, setStatsAlarm}) => {

    const refLabel = useRef(null)

    const [alarmStats, setAlarmStats] = useState('')

    const checkHours = 24 - alarmStats?.hour == 1 ? ' hour ' : ' hours '
    console.log(24 - alarmStats?.hour);

    const finalHours = alarmStats?.hour >= 1 ? 24 - alarmStats?.hour + checkHours : ''

    const checkMinutes = alarmStats?.minute - 6 == 1 ? ' minute. ' : ' minutes. '

    const finalMinutes = alarmStats?.minute - 6 >= 1 ? alarmStats?.minute - 6 + checkMinutes : ''

    const setTime =  finalHours + finalMinutes

    const time = alarmDate?.slice(9,alarmDate?.length)
    const splitTime = time.split(' ');
    const sliceTime = splitTime.slice(1,3)
    const firstValue = sliceTime[0]
    const getFirstMinute = firstValue.split('')
    const setHour = (firstValue.length <= 5 && firstValue.length < 5) ? getFirstMinute.unshift('0') : '';
    const setAnotherHour = getFirstMinute.join('');
    const timeArr = sliceTime.join('');
    const newSplitTime = timeArr.slice(-2);
    const final = setAnotherHour + ' ' + newSplitTime
    const date = final?.toUpperCase()

    const currentData = new Date();

    const diffInMilliseconds = Math.abs(new Date(currentData) - new Date(alarmDate));
      
    const convertToMS = (milliseconds) => {
        let day, hour, minute, seconds;
        seconds = Math.floor(milliseconds / 1000);
        minute = Math.floor(seconds / 60);
        seconds = seconds % 60;
        hour = Math.floor(minute / 60);
        minute = minute % 60;
        day = Math.floor(hour / 24);
        if(minute <= 60) {
            minute = 65 - minute;
        }

        hour = hour % 24;

        return {
            day: day,
            hour: hour,
            minute: minute,
            seconds: seconds
        };
    }

    useEffect(() => {
        setAlarmStats(convertToMS(diffInMilliseconds))
    },[])
    

    const handleNotification = async () => {

        await setChecked(!checked)

        if(!checked) {
            setIsAlarmChecked(true)
            setStatsAlarm(setTime)
        }

        else {

            setIsAlarmChecked(false)
        }
    }

    return (
        <div key = {index} className = 'alarmUP'>
            <div className = 'alarmTime'>
                <h2> {date} </h2>
            </div>
            <label>
                <input type = 'checkbox' id = 'checkInput' />
                <span ref = {refLabel} onClick = {handleNotification} className = 'check'></span>
            </label>
        </div>
    )
}

export default DataAlarms
