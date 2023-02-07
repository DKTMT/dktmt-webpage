import React from 'react';
import { Card } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';


function Register() {

    const navigate = useNavigate()

    const onFinish = (values) => {
        console.log('Success:', values);
        navigate('/')
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="App flex flex-col min-h-screen">
            <div className='h-16 w-full text-end'>
                <p className='mt-6 mr-10'> Don't have a account yet? Get started here</p>
            </div>
            <div className='flex-1 bg-slate-100 flex flex-col'>
                <div className='flex rounded-3xl mx-60 mt-28 shadow-md overflow-hidden'>
                    <img src='https://media.discordapp.net/attachments/774576895806406666/1068800055991091210/ezgif-1-9d005465b8.jpg'
                        className='w-1/2'>
                    </img>

                    <div className='w-1/2 pl-16 justify-center bg-white'>
                        <Form
                            name="normal_login"
                            className="space-y-10, mt-10 pr-20"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <p className='text-4xl mb-4 font-bold'> Register Here</p>
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
                            <Form.Item
                                name="confirm password"
                                rules={[{ required: true, message: 'Please input your confirm Password!' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Confirm Password"
                                />
                            </Form.Item>
                            <a></a>
                            <Form.Item>
                                <Button htmlType='submit'> Register </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register