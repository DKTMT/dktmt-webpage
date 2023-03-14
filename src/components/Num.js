import React from 'react'

function Num(props) {
  return (
    <div className=' border-blue-400 border-2'>
        <p className='text-blue-400 m-2'> {props.num}</p>
    </div>
  )
}

export default Num