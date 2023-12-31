const apiKey='e056f05be5c0eea1b8f8521eb6c50763';
const apiUrl='https://api.openweathermap.org/data/2.5/weather?&units=metric'

const searchBox=document.querySelector('.search input');
const searchBtn=document.querySelector('.search button');
const weatherIcon=document.querySelector('.weather-icon')

searchBtn.addEventListener('click',()=>{
    checkWeather(searchBox.value);
})
searchBox.addEventListener('keydown',(event)=>{
    if(event.key==='Enter')
      checkWeather(searchBox.value);
})

async function checkWeather(city){
    const response=await fetch(apiUrl+`&appid=${apiKey}`+`&q=${city}`);

    if(response.status===404){
        document.querySelector('.error').style.display='block';
        document.querySelector('.weather').style.display='none';
        return;
    }

    var data=await response.json();

    console.log(data);

    document.querySelector('.city').innerHTML=data.name;
    document.querySelector('.temp').innerHTML=Math.round(data.main.temp)+'°c';
    document.querySelector('.humidity').innerHTML=data.main.humidity;
    document.querySelector('.wind').innerHTML=Math.round(data.wind.speed *1.60934)+'Km/hr';

    if(data.weather[0].main==='Clouds')
        weatherIcon.src="images/clouds.png";
    else if(data.weather[0].main==='Clear')
        weatherIcon.src="images/clear.png";
    else if(data.weather[0].main==='Rain')
        weatherIcon.src="images/rain.png";
    else if(data.weather[0].main==='Drizzel')
        weatherIcon.src="images/drizzle.png";
    else if(data.weather[0].main==='Mist')
        weatherIcon.src="images/mist.png";
   

    document.querySelector('.weather').style.display='block';   
    document.querySelector('.error').style.display='none';
}
