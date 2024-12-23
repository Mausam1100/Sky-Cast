import React from 'react'
import bgImage from '../assets/bridge-192986_1920.jpg'
import WeatherDetails from './WeatherDetails'

const WeatherBackground = () => {
  return (
    <div className='h-screen w-full bg-cover bg-center px-7 fixed' style={{backgroundImage: `url(${bgImage})`}}>
        <WeatherDetails />
    </div>
  )
}

export default WeatherBackground