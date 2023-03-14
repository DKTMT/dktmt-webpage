import React, { useEffect } from 'react'
import { Tabs } from 'antd';
import { ConfigProvider} from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import Paragraph from 'antd/es/skeleton/Paragraph';
import {UserOutlined} from '@ant-design/icons'

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
      key: '/startegy',
      label: 'Strategy',
    },
    {
      key: '/account',
      label: 'Account',
    },
  ]

const Navbar = () => {
  
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const noNavbarPath = [
      '/login',
      '/register'
    ]

    return (

        <div className={`w-full flex justify-center relative ${noNavbarPath.includes(pathname)? 'hidden': ''}`} >
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
                <UserOutlined className='absolute right-0'/>
            </div>
        </div>
    )
}

export default Navbar