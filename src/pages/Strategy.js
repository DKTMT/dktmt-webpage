import React, { useEffect } from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Select, Modal, List, } from 'antd';
import { useState } from 'react';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import Num  from '../components/Num'


const strategy_list = ["average_true_range", "commodity_channel_index", "macd", "ichimoku_cloud", "triangular_moving_average", "pivot_points", "money_flow_index", "bollinger_bands", "stochastic_oscillator", "parabolic_sar", "relative_strength_index", "moving_average", "fibonacci_retracement"]

const confident_level_list = ["Very High", "High", "Medium", "Low"]

function Strategy() {

    const [form] = Form.useForm();

    const [strategys, setStrategy] = useState([])

    const onFinish = (values) => {
        let desc = ''
        values.strategy_list.map((ele) => {
            desc += ele.strategy + ": " + ele.confident + "\n" 
        })
        const val = { 'desc': desc, ...values }
        setStrategy([val, ...strategys])
        console.log('Received values of form:', values);
        setIsModalOpen(false)
    };

    useEffect(() => {
        console.log(strategys)

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
            strategy_list: [{strategy: 'average_true_range', confident: 'Very High'}, {strategy: 'pivot_points', confident: 'Medium'}],
            strategyname: "Strategy1"
        },
        {
            desc: "pivot_points: Medium",
            strategy_list: [{strategy: 'average_true_range', confident: 'Very High'}, {strategy: 'pivot_points', confident: 'Medium'}],
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
                        <p className='mr-4 text-xl'> {index+1 + '.'} </p>
                        <List.Item.Meta
                            title={<a>{item.strategyname}</a>}
                            description={<a>{item.desc}</a>}
                        />
                        <div className='right-0 mr-4 space-x-4'>
                            <EditOutlined/>
                            <DeleteOutlined/>
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
                        name="strategyname"
                        rules={[{ required: true, message: 'Please input your strategy name' }]}
                        label="Name"
                    >
                        <Input placeholder="strategy name" />
                    </Form.Item>

                    <Form.List name="strategy_list" className='w-full'>
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'strategy']}
                                        >
                                            <Select className='' placeholder='Strategy' style={{ width: 300 }}>
                                                {
                                                    strategy_list.map((strategy) => (
                                                        <Select.Option value={strategy}>{strategy}</Select.Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'confident']}
                                            rules={[{ required: true, message: 'Missing confident level' }]}
                                        >
                                            <Select className='' placeholder='Confident Level' style={{ width: 145 }}>
                                                {
                                                    confident_level_list.map((conf) => (
                                                        <Select.Option value={conf}>{conf}</Select.Option>
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