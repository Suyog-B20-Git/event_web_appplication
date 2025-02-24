/* eslint-disable react/prop-types */
import React from 'react'

function FacebookEmbeded({appId}) {
  return (
    <iframe
    src={`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FZeenews&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=${appId}`}
   
    
    className='w-[300px] h-[500px]'
    style={{ border: "none", overflow: "hidden" }}
    scrolling="no"
    frameBorder="0"
    allowfullscreen="true"
    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
  ></iframe>
  )
}

export default FacebookEmbeded
