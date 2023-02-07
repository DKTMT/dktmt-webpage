import react from 'react'
import Navbar from '../components/Navbar'
import { Card, Col, Row } from 'antd';
import PieChart from "../components/Piechart";
import LineChart from "../components/LineChart"
import PromptCard from "../components/PromptCard"
import PortforlioCard from '../components/PortforlioCard';

const Home = () => {
    return(
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
                    <PortforlioCard/>
                  </Card>
                </div>
                <div className='w-3/5 space-y-4'>
                  <Card className=''>
                    <PromptCard title="Select a Coin" desc="select yours strategy focus coin" button="try now"/>
                  </Card>
                  <Card className=''>
                    <PromptCard title="API Integration" desc="We will select a suitable strategies for efficient profit" button="try now"/>
                  </Card>
              </div>
            </div>
            <LineChart className=""/>
          </div>
          <div className='w-3/6'>
            <Card className='flex justify-between flex-col'>
              <PieChart/>
            </Card>
          </div>
        </div>
      </div>
      </div>
    </div>
    )
}

export default Home
