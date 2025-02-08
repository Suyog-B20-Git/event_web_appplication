/* eslint-disable react/prop-types */
import React from 'react'
import Button from '../ReusableComponents/Button'

function GetTicket({start,sTime,eTime}) {
  return (
    <div className=' shadow gap-2 lg:gap-0 rounded-xl  m-1 flex p-2 justify-around hover:bg-gray-100'>
        <p className='text-sm lg:text-base' >{start}</p>
        {/* <Button text={"Ended"} rounded={"rounded-xl"} textSize={"text-base"} variant={"primary"}/> */}
        <button className='rounded-xl lg:text-base text-xs lg:p-1  lg:px-4 px-3 bg-[#ff2459]'>Ended</button>
        <p className='text-sm lg:text-base font-semibold'>{sTime} - {eTime}</p>
      
    </div>
  )
}

export default GetTicket
