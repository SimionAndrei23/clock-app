import React, { useEffect, useState, useCallback, useMemo } from 'react'


const DataAlarms = ({index,id,dataAlarms,setDataAlarms,alarmDate,alarmState,setIsAlarmChecked,isAlarmDeleted, setIsAlarmDeleted,setStatsAlarm,setGetDataOfAlarm}) => {

    const [checked, setChecked] = useState(false);

    const [alarmStats, setAlarmStats] = useState('')

    const dateCurrent = new Date();

    const computedDayPlusOne = String(dateCurrent.getDate()).length === 1 ? `0${dateCurrent.getDate() + 1}` : dateCurrent.getDate();
    const computedDay = String(dateCurrent.getDate()).length === 1 ? `0${dateCurrent.getDate()}` : dateCurrent.getDate();
    const computedMonth = String(dateCurrent.getMonth() + 1).length === 1 ? `0${dateCurrent.getMonth() + 1}` : dateCurrent.getMonth() + 1;
    const year = dateCurrent.getFullYear();
    const todayPlusOne = computedMonth + '/' + computedDayPlusOne + '/' + year;
    const today = computedMonth + '/' + computedDay + '/' + year

    const checkHours = (24 - alarmStats?.hour === 23) ? ' hour ' : ' hours '
    const conditionalHours = ((new Date(dateCurrent) < new Date(today + ' ' + alarmDate)) && (new Date(dateCurrent) > new Date(today + ' ' + alarmDate))) ? 23 - alarmStats?.hour + checkHours : 23 - (23 - alarmStats?.hour) + checkHours;
    const verifiedHours = 23 - alarmStats?.hour === 23 ? 23 - alarmStats?.hour + checkHours : conditionalHours
    const newConditionalHours = ((23 - (23 - alarmStats?.hour) === 0) && (alarmStats?.minute === 6)) ? 24 - (23 - alarmStats?.hour) + ' hour. ' : '';
    const conditionalZeroHours = 23 - (23 - alarmStats?.hour) === 0 ? newConditionalHours : 24 - (23 - alarmStats?.hour) + checkHours
    const checkBeforeHours = (new Date(dateCurrent) > new Date(today + ' ' + alarmDate)) ? (23 - alarmStats?.hour) + checkHours : conditionalZeroHours
    const finalHours = alarmStats?.hour > 0 ? verifiedHours : checkBeforeHours
    const checkMinutes = (alarmStats?.minute - 6 === 59) ? ' minute. ' : ' minutes. '
    const conditionalMinutes = ((new Date(dateCurrent) < new Date(today + ' ' + alarmDate)) && (new Date(dateCurrent) > new Date(today + ' ' + alarmDate))) ? alarmStats?.minute - 6 + checkMinutes : 60 - (alarmStats?.minute - 6) + checkMinutes
    const finalMinutes = alarmStats?.minute - 6 >= 1 ? conditionalMinutes : ''
    const setTime =  finalHours + finalMinutes

    const splitTime = alarmDate?.split(' ')
    const firstValue = splitTime[0];
    const splitFirstValue = firstValue.split(' ');
    let sliceFirstValue = splitFirstValue[0].length <= 4 ? splitFirstValue[0].slice(0,1) : '';
    sliceFirstValue = sliceFirstValue.length === 1 ? splitFirstValue.unshift('0') : '';
    const joinTime = splitFirstValue.join('');
    const secondValue = splitTime[1];
    const finalDate = (joinTime + ' ' + secondValue).toUpperCase();

    const diffInMilliseconds = Math.abs(new Date(dateCurrent) - new Date(todayPlusOne + ' ' + alarmDate));

    const date1 = dateCurrent + '';
    let date1Splitted = date1.split(' ');
    let date1SplittedData = date1Splitted[4];
    const date1SubSplitted = date1SplittedData.split(' ');
    const date1SubSplittedData = date1SubSplitted[0].slice(0,5);
    date1Splitted.splice(4,1,String(date1SubSplittedData));
    const date1Final = useMemo(() => new Date(date1Splitted.join(' ')),[date1Splitted]);
    const date2Final = useMemo(() => new Date(today + ' ' + alarmDate),[today,alarmDate]);

    const formatTime = (date) => {

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours > 12 ? 'pm' : 'am'
            hours = hours % 12;
            hours = hours ? hours : 12
            minutes = minutes < 10 ? '0' + minutes : minutes
        let strTime = hours + ':' + minutes + ' ' + ampm;

        return strTime;
    
    }

       const dateFormatCurrent = formatTime(date1Final);

       const [isActivate, setIsActive] = useState(false);

       const getDataAlarm = useCallback(() => {
        return dataAlarms?.find((alarm) => alarm.date === dateFormatCurrent);
    },[dataAlarms,dateFormatCurrent])

       useEffect(() => {
        if ((date1Final.getTime() === date2Final.getTime()) && alarmState) {
            setIsActive(true)
        }
        else {
            setIsActive(false)
        }
    },[date1Final,date2Final,alarmState])

    useEffect(() => {
        if(isActivate) {
            setGetDataOfAlarm(getDataAlarm())
        }
    },[isActivate])

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
    },[dateCurrent])
    
    const handleNotification = () => {

        setChecked(!checked)

         if(!checked && !alarmState) {
            setIsAlarmChecked(true);
            setStatsAlarm(setTime);
            let copiedArr = [...dataAlarms];
           let tempElement = {...copiedArr[index]};
           tempElement.setAlarm = true;
           copiedArr[index] = tempElement;
           setDataAlarms(copiedArr);
        }

        else {
           let copiedArr = [...dataAlarms];
           let tempElement = {...copiedArr[index]};
           tempElement.setAlarm = false;
           copiedArr[index] = tempElement;
           setDataAlarms(copiedArr);
        }
    }

    const deleteTime = (id) => {
        const newList =  dataAlarms?.filter(alarm => alarm.id !== id)
        setDataAlarms(newList);
        setIsAlarmDeleted(!isAlarmDeleted);
    }

    return (
        <div key = {index} className = 'alarmUP'>
            <div className = 'alarmTime'>
                <h2>{finalDate}</h2>
            </div>
            <div onClick = {() => deleteTime(id)} className = 'deleteTime'>
                <span></span>
                <span></span>
            </div>
            {
                alarmState && (
                    <label>
                        <input type = 'checkbox' id = 'checkInput' />
                        <span onClick = {handleNotification} className = 'check1'></span>
                    </label>
                )
            }
            {
                !alarmState && (
                    <label>
                        <input type = 'checkbox' id = 'checkInput' />
                        <span onClick = {handleNotification} className = 'check'></span>
                    </label>
                )
            }
        </div>
    )
}

export default DataAlarms
