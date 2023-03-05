// fetch hands of clock and timezone buttons
const hr = document.getElementById("hour-hand")
const min = document.getElementById("minute-hand")
const sec = document.getElementById("second-hand")

const indButton=document.getElementById('ind');
const uaeButton=document.getElementById('uae');
const japanButton=document.getElementById('japan');

// defining the intitial position for clock hands
  hr.style.rotate = "0deg";
  min.style.rotate = "0deg";
  sec.style.rotate = "0deg";

// this functions takes the first two llaters fo a country code and name of the country and set the clock time to that country
function clockSetter(country , name)
{
  const timestamp = fetch(`https://api.ipgeolocation.io/timezone?apiKey=95428a7a36764b7cb17efd712f4f0d10&tz=${country}`)
  .then(response => response.json()) // converting the recieved response into json format 
  .then(data => {return data}) // returing the data as a promise
  .catch(error => console.error(error));

    

  timestamp.then(data => {
    console.log(data , data.date_time);
    // creating a Date obj using timestamp and gmtOffset
    const date = new Date(data.date_time);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();



    // setting the clock hands according to time
    hr.style.rotate = (`${((hours*30)+(minutes*0.5)+(seconds*0.03333))%(360)}deg`);
    min.style.rotate = (`${((minutes*6)+(seconds*(0.1)))%(360)}deg`);
    sec.style.rotate = (`${((seconds*(6)))%(360)}deg`);
    
    document.getElementById('zone').innerHTML=`Current Time Zone: ${name}`;
  });
}

// this function makes the clock live
function clockRunner()
{
  // using setinterval to call a funtion after every second to rotate the second hand by 6deg
  setInterval(()=>{
    let temp = parseInt(sec.style.rotate);
    temp+=6;

    if(temp>360)
        temp=6;

    sec.style.rotate=`${temp}deg`;

  },1000);

  // calling a function after every 10 sec to rotate the minute hand by 1deg
  setInterval(()=>{
      let temp = parseInt(min.style.rotate);
      temp+=1;

      if(temp>360)
          temp=1;

      min.style.rotate=`${temp}deg`;

  },10000);
  // // calling a function after every 6 min to rotate the hour hand by 3deg
  setInterval(()=>{
    let temp = parseInt(hr.style.rotate);
    temp+=3;

    if(temp>360)
        temp=3;

    hr.style.rotate=`${temp}deg`;

  },600000)
}

// adding eventlistener on click for time zones button 
indButton.addEventListener('click',()=>clockSetter("Asia/Kolkata","INDIA"));
uaeButton.addEventListener('click',()=>clockSetter("Asia/Dubai","U.A.E"));
japanButton.addEventListener('click',()=>clockSetter("Japan","JAPAN"));

// starting the clock
(()=>{
  clockRunner();  
  clockSetter("Asia/Kolkata","INDIA")
})();