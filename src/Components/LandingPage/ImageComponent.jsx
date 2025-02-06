
import HeaderComponet from "../Layout/HeaderComponet"


const ImageComponet=()=>{
  return(
    <>
  <div className="flex flex-col">

    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('public/bg-image.png')" }}>
      {/* Overlay text */}
  <HeaderComponet />
     
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <h1 className="text-white text-4xl sm:text-6xl font-bold">
          Welcome to My Website
        </h1>
      </div>
    </div>
   
  </div>
  
  </>
  
  )
  }
  export default ImageComponet