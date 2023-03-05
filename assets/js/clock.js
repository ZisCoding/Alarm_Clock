// fetch hands of clock and timezone buttons
const hr = document.getElementById("hour-hand")
const min = document.getElementById("minute-hand")
const sec = document.getElementById("second-hand")

const indButton=document.getElementById('ind');
const uaeButton=document.getElementById('uae');
const japanButton=document.getElementById('japan');

// defining the initial postision of clock hands
sec.style.rotate='0deg';
min.style.rotate='0deg';
hr.style.rotate='0deg';

// this functions takes the first two llaters fo a country code and name of the country and set the clock time to that country
function clockSetter(country,name)
{
  // api call to fetch timmestamp of corresponding country
  const timestamp =  fetch(`http://api.timezonedb.com/v2.1/list-time-zone?key=KQMSGLUR2U1A&format=json&country=${country}`)
  .then(response => response.json()) // converting the recieved response into json format 
  .then(data => {return data}) // returing the data as a promise
  .catch(error => console.error(error));
  

  timestamp.then(data => {

    const countryData=data.zones[0];

    // creating a Date obj using timestamp and gmtOffset
    const date = new Date((countryData.timestamp + (countryData.gmtOffset / 3600)) * 1000);

    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    // setting the clock hands according to time
    hr.style.rotate = (`${(hours*30)+(minutes*0.5)+(seconds*(0.03333))}deg`);
    min.style.rotate = (`${(minutes*6)+(seconds*(0.1))}deg`);
    sec.style.rotate = (`${+(seconds*(6))}deg`);
    
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

      if(temp>360)
          temp=1;

      min.style.rotate=`${temp}deg`;

  },10000);
  // // calling a function after every 6 min to rotate the hour hand by 3deg
  setInterval(()=>{
    let temp = parseInt(hr.style.rotate);
    temp+=3;

    if(temp>360)
        temp=1;

    hr.style.rotate=`${temp}deg`;

  },60000)
}

// adding eventlistener on click for time zones button 
indButton.addEventListener('click',()=>clockSetter("IN","INDIA"));
uaeButton.addEventListener('click',()=>clockSetter("UA","U.A.E"));
japanButton.addEventListener('click',()=>clockSetter("JP","JAPAN"));

// starting the clock
(()=>{
  clockSetter("IN","INDIA")
  clockRunner();  
})();