import React,{useState} from 'react'
import { useLocation } from 'react-router-dom'
import MeditationForm from '../Components/FeaturedEvent/MeditationForm';

const BookTicket = () => {
    const location = useLocation();
    const data = location.state?.data;

  return (
    <div className="min-h-screen p-4 bg-white">
    <MeditationForm data={data} />
  </div>
  )
}

export default BookTicket