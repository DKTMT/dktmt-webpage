import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import CoinCard from '../components/CoinCard';
import { Avatar, List, Button, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function CoinSelect() {

  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  
  
  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
      .then(response => setCoins(response.data))
      .then(() => setLoading(false));
  }, []);

  return (
    <div className=''>
        <div className='space-y-5 mt-10 flex flex-col items-center w-full'>
            <p className='text-4xl font-bold'> Select your coin</p>
            <p className=' text-gray-500 mb-4'> we wil apply a suitable strategy for you</p>
            {
                !loading?
                <List
                itemLayout="horizontal"
                dataSource={coins}
                className='relative w-2/6 h-96 overflow-scroll'
                renderItem={(coin) => (
                <List.Item>
                    <List.Item.Meta
                    avatar={<Avatar src={coin.image} />}
                    title={<a href="https://ant.design">{coin.symbol}</a>}
                    description={coin.name}
                    />
                    <button className='absolute right-0'>
                        select
                    </button>
                </List.Item>
                )}
            />:                 
            <Spin indicator={antIcon} />
            }
            <button className='p-2 bg-blue-500 hover:bg-blue-400 px-5 text-white rounded-lg transition duration-200'>Save</button>
        </div>
    </div>
  )
}

export default CoinSelect