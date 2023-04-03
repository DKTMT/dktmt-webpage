import React from 'react';
import { Card } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Checkbox, Form, Input, ConfigProvider } from 'antd';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


function Login() {

    const login = (values) => {
        axios.post('http://localhost:8000/api/auth/login', {
            email: values.email,
            password: values.password
        })
            .then(function (response) {
                console.log(response);
                localStorage.setItem("user", response.data.accessToken)
                navigate('/')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const navigate = useNavigate()

    const onFinish = (values) => {
        console.log('Success:', values);
        login(values)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="App flex flex-col min-h-screen">
            <div className='h-16 w-full text-end'>
                <p className='mt-6 mr-10 cursor-pointer' onClick={() => navigate('/register')}> Don't have a account yet? Get started here</p>
            </div>
            <div className='flex-1 bg-slate-100 flex flex-col items-center '>
                <div className='flex rounded-3xl mt-28 shadow-md overflow-hidden max-w-2xl mx-10 space-x-4 bg-white'>
                    <div className='flex-1 hidden md:block'>
                        <img src='https://media.discordapp.net/attachments/774576895806406666/1068800055991091210/ezgif-1-9d005465b8.jpg'
                            className='bg-cover h-full w-full'>
                        </img>
                    </div>

                    <div className='flex-1 justify-center'>
                        <Form
                            name="normal_login"
                            className="space-y-10, mt-10 pr-10"
                            onFinish={onFinish}
                        >
                            <p className='text-4xl mb-4 font-bold'> Welcome Back</p>
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Please input your Email!' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button button_name='login' />
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login