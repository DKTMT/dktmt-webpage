import React from 'react'

function Button({button_name}) {
  return (
    <button type='submit' className='p-2 bg-blue-500 hover:bg-blue-400 px-5 text-white rounded-lg transition duration-200'>{button_name}</button>
  )
}

export default Button