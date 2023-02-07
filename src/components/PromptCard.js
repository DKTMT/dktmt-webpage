import React from 'react'

const PromptCard = (props) => {
    return (
        <div>
            <p className="font-bold text-2xl">{props.title}</p>
            <div className='flex items-end'>
                <p className='text-gray-500 text-lg mr-5'>{props.desc}</p>
                <p className='text-blue-600 font-bold w-24 text-right'>{props.button}</p>
            </div>
        </div>
    )
}

export default PromptCard