import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'

import humidity_icon from '../assets/weather_humidity.svg'
import search_icon from '../assets/icon_search.svg'
import wind_icon from '../assets/weather_windy.svg'



import clear_day from '../assets/weather_clearday.svg'
import clear_night from '../assets/weather_clearnight.svg'
import cloudy from '../assets/weather_cloudy.svg'
import cloudy_day from '../assets/weather_cloudyday.svg'
import cloudy_night from '../assets/weather_cloudynight.svg'
import foggy from '../assets/weather_foggy.svg'
import hail from '../assets/weather_hail.svg'
import misty from '../assets/weather_misty.svg'
import rainy from '../assets/weather_rainy.svg'
import snow from '../assets/weather_snow.svg'
import thunderstorm from '../assets/weather_thunderstorm.svg'


const Weather = () => {

    const inputRef = useRef()

    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": clear_day,
        "01n": clear_night,
        "02d": cloudy_day,
        "02n": cloudy_night,
        "03d": cloudy,
        "03n": cloudy,
        "04d": foggy,
        "04n": foggy,
        "09d": rainy,
        "09n": rainy,
        "11d": thunderstorm,
        "13d": snow,
        "13n": snow,
        "50d": misty,
        "50n": misty,
        


    }
// fetch city
    const search = async (city)=>{
         if(city === ""){
             alert("enter city name!");
            return;
         }
        try {
            const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok){
                alert(data.message);
                return;
            }
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_day;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed.toFixed(),
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })

        } catch(error) {
            setWeatherData(false);
            console.error("error in fetching weather data")

        }
    }

    //end fetch city

    



     useEffect(()=> {
     search("Dallas");
     },[])

  return (
    <div className="weather">
        <div className= "searchbar">
            <input ref={inputRef} type="text" placeholder="search"/>
            <img src={search_icon} alt="search icon" onClick={()=> search(inputRef.current.value)} />
        </div>

        {weatherData?<>
        
       <img className="weathericon" src={weatherData.icon} alt="" />
       <p className="temperature">{weatherData.temperature}°F</p>
       <p className="location">{weatherData.location}</p>

       <div className="weatherdata">
        <div className="col">
            <img src={humidity_icon} alt="humidity icon" />
            <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className="col">
            <img src={wind_icon} alt="wind Speed icon"></img>
            <div>
                <p>{weatherData.windSpeed} mph</p>
                <span>Wind Speed</span>
            </div>
        </div>

    

       </div>
       </>:<></>}

    </div>
  )
}

export default Weather