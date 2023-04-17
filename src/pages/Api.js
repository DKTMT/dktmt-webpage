import React from 'react'
import { useState, useEffect } from 'react';
import { Button, Form, Input, ConfigProvider, Select, message, Spin } from 'antd';
import { CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from 'axios'
import ExchangeService from '../services/ExchangeService'

function Api() {

  const exchange_list = [
    { value: 'binance', label: 'Binance' },
  ]

  const [exchange, setExchange] = useState("")
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(true)
  const antIcon = <LoadingOutlined style={{ fontSize: 150 }} spin />;

  const errorMessage = (errorMsg) => {
    messageApi.open({
      type: 'error',
      content: errorMsg,
    });
  };

  const success = (msg) => {
    messageApi.open({
      type: 'success',
      content: msg,
    });
  };



  const handleChange = (values) => {
    setExchange(values)
  }
  const onFinish = (values) => {

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('user')
      }
    }

    values['exchange'] = exchange


    ExchangeService.add_api({
      exchange: values.exchange,
      api_key: values.api_key,
      api_secret: values.api_secret
    }, config)
      .then(function (response) {
        success('API added success')
        setHasAPI(true)
      })
      .catch(function (error) {
        errorMessage(error.response.data.detail)
      });
  }

  const [hasAPI, setHasAPI] = useState(false)

  useEffect(() => {
    const tokenStr = localStorage.getItem('user')
    axios.get("http://localhost:8000/api/exchange/binance/api/validate", { headers: { "Authorization": `Bearer ${tokenStr}` } })
      .then(res => {
        setHasAPI(res.data.result == true ? true : false)
        setLoading(false)
      })
      .catch(error => {
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

  if (hasAPI) {
    return (
      <div className='flex justify-center'>
        <div className='text-center mt-20'>
          <CheckCircleOutlined className='text-green-400' style={{ 'fontSize': 300 }} />
          <p className='mt-6 text-gray-600 text-lg'> You're successfully register API key.</p>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className=''>
        <div className='space-y-5 mt-10 flex flex-col items-center w-full'>
          {contextHolder}
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
      </div>
    )
  }
}

export default Api