import React, { useEffect } from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Select, Modal, List, } from 'antd';
import { useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Num from '../components/Num'
import axios from 'axios';


const strategy_list = ["average_true_range", "commodity_channel_index", "macd", "ichimoku_cloud", "triangular_moving_average", "pivot_points", "money_flow_index", "bollinger_bands", "stochastic_oscillator", "parabolic_sar", "relative_strength_index", "moving_average", "fibonacci_retracement"]


function Strategy() {

    const [form] = Form.useForm();

    const [strategys, setStrategy] = useState([])
    const [strategyList, setStrategyList] = useState([])

    const onFinish = (values) => {
        const tokenStr = localStorage.getItem('user')
        console.log('Received values of form:', values);
        const body = {
            name: values.name,
            method: {
                name: "chain",
                order: values.strategy_order
            },
            public: true,
            anonymous: true,
        }
        // setIsModalOpen(false)
        console.log(body);
        axios.post('http://localhost:8000/api/task/predict/custom-strategy', body, { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then(res => {
                res.statusCode = 201?   fetchStrategy() : "";
            })
        // setIsModalOpen(false)
    };

    const fetchStrategy = () => {
        const tokenStr = localStorage.getItem("user");
        axios.get('http://localhost:8000/api/task/predict/custom-strategy', { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then(res => {
                setStrategy(res.data)
                const data = res.data.map((ele) => {
                    return {
                        name: ele.name,
                        desc: ele.method['id']
                    }
                })
            })

    }

    useEffect(() => {
        const tokenStr = localStorage.getItem('user')
        axios.get('http://localhost:8000/api/task/predict/strategy', { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then(res => {
                console.log(res.data);
                setStrategyList(res.data.strategies);
            })
        fetchStrategy()
    }, [])

    useEffect(() => {
        console.log(strategys);

    }, [strategys])


    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const test = [
        {
            desc: "pivot_points: Medium",
            strategy_list: [{ strategy: 'average_true_range', confident: 'Very High' }, { strategy: 'pivot_points', confident: 'Medium' }],
            strategyname: "Strategy1"
        },
        {
            desc: "pivot_points: Medium",
            strategy_list: [{ strategy: 'average_true_range', confident: 'Very High' }, { strategy: 'pivot_points', confident: 'Medium' }],
            strategyname: "Strategy1"
        }
    ]


    return (
        <div className='flex flex-col items-center'>
            <p className='text-4xl font-bold mt-12'> Strategy</p>
            <p className=' text-gray-500 mb-4'> Let's choose your trading strategy here</p>
            <Button onClick={showModal}>
                Add Strategy
            </Button>
            <List
                itemLayout="horizontal"
                dataSource={strategys}
                className="w-3/6 mt-3"
                renderItem={(item, index) => (
                    <List.Item className="flex flex-row">
                        <p className='mr-4 text-xl'> {index + 1 + '.'} </p>
                        <List.Item.Meta
                            title={<a>{item.name}</a>}
                            // description={
                            // item.method.order.map((ele) => {
                            //     <p> {ele + "->"} </p>
                            // })
                        />
                        <div className='right-0 mr-4 space-x-4'>
                            <EditOutlined />
                            <DeleteOutlined />
                        </div>
                    </List.Item>
                )}
            />




            <Modal title="Add new custom strategy" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[
                ]}>
                <Form
                    name="dynamic_form_nest_item"
                    onFinish={onFinish}
                    className='mt-4'
                    form={form}
                >
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Please input your strategy name' }]}
                        label="Name"
                    >
                        <Input placeholder="strategy name" />
                    </Form.Item>
                    <p className='text-xl font-bold mb-4'> Order </p>
                    <Form.List name="strategy_order" className='w-full'>
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'strategy']}
                                        >
                                            <Select className='' placeholder='Strategy' style={{ width: 400 }}>
                                                {
                                                    strategyList.map((strategy) => (
                                                        <Select.Option value={strategy}>{strategy}</Select.Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add more Strategy
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.Item>
                        <Button htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Strategy