import React,{useState,useEffect,useRef} from 'react'

function Review() {
    
    const[state,setState]=useState(0)

    const inputRef=useRef()

    useEffect(()=>{

       inputRef.current.focus()

    },[])



  return (
    <div>
      <input ref={inputRef}  value="" />
    </div>
  )
}

export default Review



