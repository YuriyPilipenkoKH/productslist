import Image from "next/image"

function NotFound() {
    return (
      <div className="flex gap-2  justify-center w-full   text-slate-300 text-2xl font-bold">
      <h1>
        Sorry Dude 404
      </h1>
      <Image 
        src='https://res.cloudinary.com/dwdkw1a4j/image/upload/v1711559709/affirmation/coyote/ahoaqh0oupaqpifnurbw.png' 
        alt='icon' 
        width={200} 
        height={200}/>
      </div>
    )
  }
  
  export default NotFound