import React from 'react'
import Navbar from '../components/Navbar'
import { Button, Form, Input, ConfigProvider } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

function Api() {
  return (
<div className=''>
        <div className='space-y-5 mt-10 flex flex-col items-center w-full'>
            <p className='text-4xl font-bold'> API Intregration</p>
            <p className=' text-gray-500 mb-4'> Just follow these steps ↓</p>
            <div className='space-y-10 text-gray-700'>
              <span>1. Go to</span><span className='text-blue-600 font-bold'> Binance website.</span>
              <p>2. Create API Key<span className='text-blue-600 font-bold'> see how.</span></p>
              <p>3. Copy your API Key & Secret Key and paste it into the fields below.</p>
              <div>
              <Form
                  name="normal_login"
                  className="space-y-10, mt-10 pr-24"
                  initialValues={{ remember: true }}
              >
                  <Form.Item
                      name="api_key"
                      rules={[{ required: true, message: 'Please input your API Key!' }]}
                  >
                      <Input placeholder="API Key" />
                  </Form.Item>
                  <Form.Item
                      name="api_secret"
                      rules={[{ required: true, message: 'Please input your API Secret!' }]}
                  >
                      <Input
                          placeholder="API Secret"
                      />
                  </Form.Item>
                  <Form.Item>
                      <ConfigProvider
                          theme={{
                              components: {
                                  Button: {
                                      colorPrimary: '#00b96b',
                                  },
                              },
                          }}
                      >
                          <button type='submit' className='p-2 bg-blue-500 hover:bg-blue-400 px-5 text-white rounded-lg transition duration-200'>Save</button>
                      </ConfigProvider>
                  </Form.Item>
              </Form>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Api