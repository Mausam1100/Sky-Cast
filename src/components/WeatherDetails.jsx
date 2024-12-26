import React, { useEffect, useRef, useState } from 'react'
import bgImage2 from '../assets/sunset-7607500_1920.jpg'
import clearSky_01d from '../assets/clear_sky-01d.png'
import clearSky_01n from '../assets/clear_sky-01n.png'
import fewClouds_02d from '../assets/few_clouds-02d.png'
import fewClouds_02n from '../assets/few_clouds-02n.png'
import scatteredCloud_03d from '../assets/scattered_cloud-03d.png'
import brokenCloud_04d from '../assets/broken_clouds-04d.png'
import showerRain_09d from '../assets/showe_rain-09d.png'
import rain_10d from '../assets/rain-10d.png'
import rain_10n from '../assets/rain-10n.png'
import thunderStorm_11d from '../assets/thunderstorm-11d.png'
import snow_13d from '../assets/snow-13d.png'
import mist_50d from '../assets/mist-50d.png'
import { Search } from "lucide-react";
import toast from 'react-hot-toast';

const WeatherDetails = () => {
    const allIcons = {
        '01d': clearSky_01d,
        '01n': clearSky_01n,
        '02d': fewClouds_02d,
        '02n': fewClouds_02n,
        '03d': scatteredCloud_03d,
        '03n': scatteredCloud_03d,
        '04d': brokenCloud_04d,
        '04n': brokenCloud_04d,
        '09d': showerRain_09d,
        '09n': showerRain_09d,
        '10d': rain_10d,
        '10n': rain_10n,
        '11d': thunderStorm_11d,
        '11n': thunderStorm_11d,
        '13d': snow_13d,
        '13n': snow_13d,
        '50d': mist_50d,
        '50n': mist_50d
    }

    const [weatherInfo, setWeatherInfo] = useState({})
    const [searchValue, setSearchValue] = useState("")
    const apiKey = import.meta.env.VITE_API_KEY;

    const ref = useRef(null)

    const fetchdata = async(city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        try{
            const response = await fetch(url)
            const data = await response.json();
            if(data.cod === '404') {
                toast.error("City not found. Check your spelling.")
            }
            else{
                const icon = allIcons[data.weather[0].icon]
                console.log(data)
                setWeatherInfo({
                    city: data.name,
                    country: data.sys.country,
                    temp: Math.floor(data.main.temp),
                    humidity: data.main.humidity,
                    visibility: data.visibility,
                    wind_speed: data.wind.speed,
                    icon: icon,
                    weather_condition: data.weather[0].main
                })
            }
        }
        catch(err) {
            toast.error("An error occured. Please try again.")
        }
    }
    
    function handleSearch() {
        if(searchValue.trim() === '') {
            toast.error("Please enter a city name.")
        }
        else{
            fetchdata(searchValue)
        }
    }

    function handleKeyDown(e) {
        if(e.key==="Enter") {
            if(searchValue.trim() === '') {
                toast.error("Please enter a city name.")
            }
            else{
                fetchdata(searchValue)
            }
            
            if(ref.current) {
                ref.current.blur()
            }
        }


    }

    useEffect(() => {
      fetchdata("Kathmandu")
    }, [])

    
    // for time
    const updateTime = () => {
        const currentDate = new Date();
    
        const formattedTime = currentDate.toLocaleTimeString('en-GB', {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true,
        });

        const formattedDate = currentDate.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    
        document.getElementById("timeDisplay").innerHTML = `${formattedTime}`;
        document.getElementById("dateDisplay").innerHTML = `${formattedDate}`;
      };
    
      useEffect(() => {
        const interval = setInterval(updateTime, 1000); // Update every second
        updateTime(); // Initial call to display time immediately
    
        return () => clearInterval(interval); // Cleanup on unmount
      }, []);

    

  return (
    <div className='h-[100vh] flex items-center justify-center'>
        <div className='h-[70%] md:h-[600px] w-[750px] md:flex mt-[-60px] md:mt-0'>
            <div className='w-full md:w-[60%] h-[30%] md:h-full bg-cover bg-center relative' style={{backgroundImage: `url(${bgImage2})`}}>
                <div className='text-white absolute bottom-1.5 left-3 md:bottom-4 md:left-7'>
                    <div className='text-2xl font-medium' id='timeDisplay'></div>
                    <div className='text-sm font-light md:mt-1' id='dateDisplay'></div>
                </div>
                <div className='absolute top-2 md:top-3 right-3 md:right-4 text-white text-xl font-medium'>
                    {weatherInfo.city}, <div className='text-right'>{weatherInfo.country}</div>
                </div>
                <div className='text-white absolute bottom-1.5 right-3 md:bottom-4 md:right-7 text-4xl md:text-5xl '>
                    {weatherInfo.temp}°C
                </div>
            </div>

            <div className='w-full h-[75%] md:w-[40%] md:h-full bg-black bg-opacity-80 md:bg-opacity-90 py-4 md:py-9 px-9 md:px-5'>
                <div className='flex flex-col items-center gap-y-4'>
                    <div className='w-[70px] md:w-[110px] aspect-square'>
                        <img className='w-full h-full object-cover object-center' src={weatherInfo.icon} alt="" />
                    </div>
                    <h2 className='text-white font-medium text-2xl border-b w-full text-center pb-2 border-gray-300'>{weatherInfo.weather_condition}</h2>
                </div>

                <div className='flex items-center justify-center pt-3.5'>
                    <input type="text" ref={ref} value={searchValue} onKeyDown={handleKeyDown} onChange={(e) => setSearchValue(e.target.value)} placeholder='Search any city' className='bg-transparent w-[9rem] border-b text-sm pb-1.5 text-white outline-none' />
                    <button onClick={() => handleSearch()} className='bg-slate-600 bg-opacity-70 rounded-full p-1'><Search size={20} color="#ffffff" /></button>
                </div>

                <div className='flex flex-col items-center text-white mt-5'>
                    <h3 className='font-medium mb-3'>{weatherInfo.city}, {weatherInfo.country}</h3>
                    <div className='flex items-center justify-between border-t w-full px-2 border-gray-400 py-1'>
                        <h5>Temperature</h5>
                        <p>{weatherInfo.temp}°C</p>
                    </div>
                    <div className='flex items-center justify-between border-t w-full px-2 border-gray-400 py-1'>
                        <h5>Humidity</h5>
                        <p>{weatherInfo.humidity}%</p>
                    </div>
                    <div className='flex items-center justify-between border-t w-full px-2 border-gray-400 py-1'>
                        <h5>Visibility</h5>
                        <p>{weatherInfo.visibility} mi</p>
                    </div>
                    <div className='flex items-center justify-between border-t w-full px-2 border-gray-400 py-1'>
                        <h5>Wind Speed</h5>
                        <p>{weatherInfo.wind_speed} Km/h</p>
                    </div>
                </div>
            </div>
        </div>
        {/* <div className='text-white'>Developed by <span>Mausam Baduwal</span> | Powered by <span>React</span></div> */}
    </div>
  )
}

export default WeatherDetails