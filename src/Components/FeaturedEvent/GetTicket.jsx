/* eslint-disable react/prop-types */
import React from 'react'
import Button from '../Button'

function GetTicket({start,sTime,eTime}) {
  return (
    <div className="shadow gap-4 lg:gap-6 rounded-xl m-2 flex p-4 items-center justify-between hover:bg-gray-100">
    <p className="text-sm lg:text-base">{start}</p>
  
    <button className="rounded-xl lg:text-base text-xs lg:p-2 p-1 lg:px-6 px-3 text-white bg-[#ff2459]">
      Ended
    </button>
  
    <p className="text-sm lg:text-base font-semibold">{sTime} - {eTime}</p>
  </div>
  
  )
}

export default GetTicket
