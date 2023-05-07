import React from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import AuthService from '../services/AuthService';


function Register() {


    const register = (values) => {
        AuthService.register({
            name: values.username,
            email: values.email,
            password: values.password
        })
            .then(function (response) {
                console.log(response);
                navigate('/login')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const navigate = useNavigate()

    const onFinish = (values) => {
        register(values)
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const validatePassword = (rule, value, callback) => {
        if (value?.length < 8) {
            callback("Please input password more than 8 character");
        } else {
            callback();
        }
    };

    return (
        <div className="App flex flex-col min-h-screen">
            <div className='h-16 w-full text-end'>
                <p className='mt-6 mr-10'> Don't have a account yet? Get started here</p>
            </div>
            <div className='flex-1 bg-slate-100 flex flex-col items-center'>
                <div className='flex rounded-3xl mt-28 shadow-md overflow-hidden max-w-2xl mx-10 space-x-4 bg-white'>
                    <img src='https://media.discordapp.net/attachments/774576895806406666/1068800055991091210/ezgif-1-9d005465b8.jpg'
                        className='w-1/2'>
                    </img>

                    <div className='w-1/2 pl-2 justify-center bg-white'>
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
                                rules={[
                                    { required: true, message: 'Please input your Password!' },
                                    { validator: validatePassword }
                                ]}
                            >
                                <Input type="password" placeholder="Password" />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Please input your Email' }]}
                            >
                                <Input
                                    placeholder="Email"
                                />
                            </Form.Item>
                            <a></a>
                            <Form.Item>
                                <Button button_name='Register' />
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register