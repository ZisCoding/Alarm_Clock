
// fetching the essential elements
const hour = document.getElementById('selected-hour');
const minute = document.getElementById('selected-minute');
const second = document.getElementById('selected-second');
const title = document.getElementById('title');
const ringtone = document.getElementById('selected-ring');


//  this array will contain objects of alarm after setting alarm;
const alarms = new Array();

// this function will show different notifications to the user

function showNotification(msg)
{
    alert(msg);
}

//  this function start a timer using set timeout to complete the alarm 
function setAlarm(obj,item){

    const remainingStr = obj.hour.substring(parseInt(obj.hour).toString().length);

    let alarmHour , alarmMinute=parseInt(obj.minute) , alarmSecond=parseInt(obj.second);

    if(remainingStr==" AM"){
        if(parseInt(obj.hour)==12){
            alarmHour=0;
        }
        else{
            alarmHour=parseInt(obj.hour);
        }
    }
    else{
        if(parseInt(obj.hour)!=12){
            alarmHour=12+parseInt(obj.hour);
        }
        else{
            alarmHour=12;
        }
    }

    const givenTime = new Date();
    const currentTime = new Date();

    givenTime.setHours(alarmHour);
    givenTime.setMinutes(alarmMinute);
    givenTime.setSeconds(alarmSecond);

    console.log(givenTime.getTime(),currentTime.getTime());

    if(givenTime.getTime() < currentTime.getTime())
    givenTime.setDate(currentTime.getDate()+1);

    timeDiff= Math.abs(givenTime.getTime()-currentTime.getTime());


    return setTimeout(()=>{
        alert("Alarm is ringing");
        item.remove();
    },timeDiff);
}

//  in this fucntion we are making a list item corresponding to the recieved obj and rendering it on browser
function addToDom(obj)
{   
    const li = document.createElement('li');

    alarmId=setAlarm(obj,li);
    
    li.setAttribute("id","list-items");
    const remainingStr = obj.hour.substring(parseInt(obj.hour).toString().length);
    li.innerHTML=`
        <div class="w-75 pt-2" style="white-space: nowrap; overflow-x: scroll;">
        <span style="border-right:2px solid black;"><i class="fa-sharp fa-regular fa-alarm-clock"></i> ${parseInt(obj.hour)}:${obj.minute}:${obj.second} ${remainingStr} </span>
        <span>${obj.title}</span>

        </div>
        <div class="w-25 text-end pt-2">

            <button id="delete-alarm" value=${alarmId} type="button" class="btn w-50 btn-outline-dark fa-solid fa-trash"></button>
        </div>
    `
    document.getElementById('list').append(li);

    alarms[alarmId] = {
        id: alarmId,
        item: li
    };

    showNotification("Alarm added successfully");
}


// this function will collect data to set alarm and make an object of that data
function collectAlarmData(e){
    const obj = new Object();
    
    obj.hour=(hour.value);
    obj.minute=(minute.value);
    obj.second=(second.value);
    obj.title=title.value;

    addToDom(obj);
}

// in this function we are deleting the alarm and also clearing the timeout to the corresponding alarm
function deleteAlarm(e)
{
    clearTimeout(alarms[parseInt(e.target.value)].id);
    e.target.parentElement.parentElement.remove();
    showNotification("Alarm deleted successfully");
}

// this is a even handler which handels all the events happening over document
function eventHandler(e)
{
    if(e.target.id=="add-alarm")
    {
        collectAlarmData();
    }
    if(e.target.id=="delete-alarm")
    {
        deleteAlarm(e)
    }
}

document.addEventListener('click',eventHandler);

