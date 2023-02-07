import react from 'react'

const PortforlioCard = () => {
    return(
        <div className='space-y-2 pl-4'>
            <div className='flex justify-between space-x-14'>
                <p className="font-bold text-4xl"> $1573.69</p>
                <div className=''>
                <p className='text-gray-500'> Last Updated</p>
                <p className='text-gray-500'> 14 days ago </p>
                </div>
            </div>
            <div className='flex justify-between space-x-14'>
                <p className='text-xl text-green-500'>+ $0.00</p>
                <div className=''>
                <p className='text-gray-500'> Deposit</p>
                </div>
            </div>
            <div className='flex justify-between space-x-14'>
                <p className='text-xl text-red-500'>- $0.00</p>
                <div className=''>
                <p className='text-gray-500'> Withdraw</p>
                </div>
            </div>
        </div>
    )
}

export default PortforlioCard
