/* eslint-disable react/prop-types */
import React from 'react'
import Button from '../ReusableComponents/Button'

function GetTicket({start,sTime,eTime}) {
  return (
    <div className=' shadow gap-2 lg:gap-0 rounded-xl  m-1 flex p-2 justify-around hover:bg-gray-100'>
        <p >{start}</p>
        <Button text={"Ended"} rounded={"rounded-xl"} textSize={"text-base"} variant={"primary"}/>
        <p className='font-semibold'>{sTime} - {eTime}</p>
      
    </div>
  )
}

export default GetTicket
