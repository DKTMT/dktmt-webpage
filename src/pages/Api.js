import React from 'react'
import { useState } from 'react';
import { Button, Form, Input, ConfigProvider, Select } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import axios from 'axios'
import { key } from 'localforage';

function Api() {

  const exchange_list = [
    { value: 'binance', label: 'Binance' },
  ]

  const [exchange, setExchange] = useState("")

  const handleChange = (values) => {
    setExchange(values)
  }
  const onFinish = (values) => {

    const config = {
      headers: {
        Authorization : "Bearer " + localStorage.getItem('user')
      }
    }

    values['exchange'] = exchange
    axios.post('http://localhost:8000/api/exchange/binance/api', {
      exchange: values.exchange,
      api_key: values.api_key,
      api_secret: values.api_secret
    }, config)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const [check, setCheck] = useState(true)


  return (
    <div className=''>
      {
        check === true?
          <div className='space-y-5 mt-10 flex flex-col items-center w-full'>
            <p className='text-4xl font-bold'> API Intregration</p>
            <p className=' text-gray-500 mb-4'> Just follow these steps ↓</p>
            <div className='space-y-6 text-gray-700'>
              <span>1. Go to</span><span className='text-blue-600 font-bold'> Binance website.</span>
              <p>2. Create API Key<span className='text-blue-600 font-bold'> see how.</span></p>
              <p>3. Choose your exchange service.</p>
              <Select
                placeholder="Exchange Service"
                style={{ width: "40%" }}
                onChange={handleChange}
                options={exchange_list}
              />
              <p>4. Copy your API Key & Secret Key and paste it into the fields below.</p>
              <Form
                name="normal_login"
                className="space-y-10, mt-10 pr-24"
                onFinish={onFinish}
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
              <div>
              </div>
            </div>
          </div>
          :
          <div className='flex justify-center'>
            <div className='text-center mt-20'>
              <CheckCircleOutlined className='text-green-400' style={{'fontSize': 350}}/>
              <p className='mt-6 text-gray-600 text-2xl'> You're successfully register API key.</p>
            </div>
          </div>
      }
    </div>
  )
}

export default Api