
import db from '../db'
import React from 'react'

const Check = () => {
    const [text, setText] = React.useState([]);
    const doc ={
        _id:'1332',
        name:'Musharaf Parwez',
    }
        
    const handleCick=()=>{
        db.put(doc);
        
    }

    const handleClick2=()=>{
        db.get('1332').then((document:any)=>{
            console.log(document);
            setText(document.name);
        })
    
    }


  return (
    <div className='flex flex-col'>
        <button onClick={handleCick} >Hello</button>
        <button onClick={handleClick2} >show</button>
        <p>{text}</p>
    </div>
  )

}
export default Check