const inputbox=document.querySelector(".inputbox");
console.log(inputbox);
const btn=document.getElementById("searchbtn");
console.log(btn);
const weather_img=document.querySelector(".imagediv img");
const temp=document.querySelector(".temp");
const description=document.querySelector(".descrip");
const humidity=document.getElementById("humidity");
const pressure=document.getElementById("pressure");
const wind_speed=document.getElementById("wind-speed");
const content=document.querySelector(".content");
const location_not_found = document.querySelector('.location-not-found');

btn.addEventListener("click",function(event){
           console.log(inputbox.value);
           checkweather(inputbox.value);
});
async function checkweather(value){
    const api_key="6561bdd48e1caee68294d8bf20c6f707";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${api_key}`;
    const weatherdata=await fetch(url);
    let weather_data = await weatherdata.json();
    if(weather_data.cod===`404`){
        location_not_found.style.display = "flex";
        content.style.display = "none";
        console.log("error");
        return;
    }
    location_not_found.style.display = "none";
    content.style.display = "flex";
    console.log(weather_data)/*.then(response => response.json());*/
    temp.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    pressure.innerHTML = `${weather_data.main.pressure}hPa`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;


    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "cloud.png";
            break;
        case 'Clear':
            weather_img.src = "clear.png";
            break;
        case 'Rain':
            weather_img.src = "rain.png";
            break;
        case 'Mist':
            weather_img.src = "mist.png";
            break;
        case 'Snow':
            weather_img.src = "snowfall.png";
            break;

    }


}

