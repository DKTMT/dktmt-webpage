import React from 'react'

function CoinCard(props) {
  return (
    <div className='flex justify-between flex-row bg-stone-400 w-3/6 p-2'>
            <div className='flex'>
                <img src={props.img_url} className='w-16 h-16'></img>
                <p> {props.name}</p>
            </div>
            <div>
                {/* <button>
                    select
                </button> */}
                <p> {props.percent}</p>
                <p> {props.aseet} </p>
        </div>

    </div>
  )
}

export default CoinCard