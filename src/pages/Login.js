import React from 'react';
import { Card } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, ConfigProvider } from 'antd';

const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

function Login() {
    return (
        <div className="App flex flex-col min-h-screen">
            <div className='h-16 w-full text-end'>
                <p className='mt-6 mr-10'> Don't have a account yet? Get started here</p>
            </div>
            <div className='flex-1 bg-slate-100 flex flex-col'>
                <div className='flex rounded-3xl mx-60 mt-28 shadow-md overflow-hidden'>
                    <img src='https://media.discordapp.net/attachments/774576895806406666/1068800055991091210/ezgif-1-9d005465b8.jpg'
                        className='w-1/2 bg-cover'>
                    </img>

                    <div className='w-1/2 pl-16 justify-center bg-white'>
                        <Form
                            name="normal_login"
                            className="space-y-10, mt-10 pr-10"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <p className='text-4xl mb-4 font-bold'> Welcome Back</p>
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
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <a className="login-form-forgot" href="">
                                    Forgot password
                                </a>
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType='submit' type='primary'> login </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login