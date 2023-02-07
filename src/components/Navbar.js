import React, { useEffect } from 'react'
import { Tabs } from 'antd';
import { ConfigProvider} from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import Paragraph from 'antd/es/skeleton/Paragraph';

const items = [
    {
      key: '/',
      label: 'Overview',
    },
    {
      key: '/select',
      label: 'Coin',
    },
    {
      key: '/api',
      label: 'API',
    },
    {
      key: '/account',
      label: 'Account',
    },
  ]

const Navbar = () => {
  
    const { pathname } = useLocation();
    const navigate = useNavigate();

    

    return (
        <div className="w-full flex justify-center">
            <div className='flex space-x-8 text-gray-600 m-5 mb-0'>
                <ConfigProvider
                    theme={{
                        components: {
                        Tabs: {
                            margin: 0,
                        },
                        },
                    }}
                >
                    <Tabs 
                    activeKey={pathname} 
                    items={items}
                    onChange={(key) => {
                      navigate(key)
                    }}
                     className='mb-0'/>
                </ConfigProvider>
            </div>
        </div>
    )
}

export default Navbar