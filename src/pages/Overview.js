import { Card, Spin } from 'antd';
import PieChart from "../components/PiechartSection";
import LineChart from "../components/LineChart"
import PromptCard from "../components/PromptCard"
import PortforlioCard from '../components/PortforlioCard';
import { useEffect, useState } from 'react'
import axios from 'axios'
import { CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons';

const Overview = () => {
  const [port, setPort] = useState({})
  const [loading, setLoading] = useState(true)
  const [hasApi, setHasApi] = useState(false) 
  const antIcon = <LoadingOutlined style={{ fontSize: 150 }} spin />;
  const tokenStr = localStorage.getItem('user')
  
  const fetchPort = () => {
    axios.get("http://localhost:8000/api/exchange/binance/port", { headers: { "Authorization": `Bearer ${tokenStr}` } })
    .then(res => {
      setPort(res.data)
      setLoading(false)
    })
  }
  useEffect(() => {
    axios.get("http://localhost:8000/api/exchange/binance/api/validate", { headers: { "Authorization": `Bearer ${tokenStr}` } })
      .then(res => {
        setHasApi(res.data.result == true ? true : false)
        fetchPort()
      }).catch(error => {
        setHasApi(false)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className='flex justify-center min-h-screen mt-40'>
          <Spin indicator={antIcon} />
      </div>
    )
  }
  if (!hasApi) {
    return (
      <div className='flex justify-center'>
        <div className='text-center mt-20'>
          <CloseCircleOutlined className='text-gray-400' style={{ 'fontSize': 300 }} />
          <p className='mt-6 text-gray-600 text-lg'> You haven't registered any account please add an API to access your account on API page.</p>
        </div>
      </div>
    )
  }
  return (
    <div className="App flex flex-col min-h-screen">
      <div className='w-full px-36'>
        <div className='flex-1 flex flex-col items-center'>
          <div className='text-center mt-6'>
            <p className='text-4xl font-bold'> Overview</p>
            <p className=' text-gray-500 mb-4'> Let's explore your portforlio</p>
          </div>
          <div className='flex flex-row justify-center mt-5 space-x-4'>
            <div className='flex flex-col space-y-4'>
              <div className='flex flex-row space-x-4'>
                <div className='w-3/5'>
                  <Card className='flex justify-between flex-col'>
                    <PortforlioCard port_value={port.port_value} />
                  </Card>
                </div>
                <div className='w-3/5 space-y-4'>
                  <Card className=''>
                    <PromptCard title="Select a Coin" desc="select yours strategy focus coin" button="try now" />
                  </Card>
                  <Card className=''>
                    <PromptCard title="API Integration" desc="We will select a suitable strategies for efficient profit" button="try now" />
                  </Card>
                </div>
              </div>
              <LineChart className="" />
            </div>
            <div className='w-3/6'>
              <Card className='flex justify-between flex-col'>
                <PieChart coins={port.coins_possess} port_value={port.port_value} />
              </Card>
            </div>
          </div>

        </div>
      </div>
    </div>

  )
}

export default Overview
