import React from 'react'
import { Space, Table, Tag } from 'antd';
import { Modal, Button } from 'antd';
import { useState, useEffect } from 'react';
import { Select } from 'antd';
import { Form, Input, List, } from 'antd';
import axios from 'axios'

function Task() {

    const columns = [
        {
            title: 'Task',
            dataIndex: 'task',
            key: 'task',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Method',
            dataIndex: 'method',
            key: 'method',
        },
        {
            title: 'Strategies',
            dataIndex: 'strategies',
            key: 'strategies',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (_, { status }) => (
                <>
                    {status.map((tag) => {
                        let color = 'blue'
                        if (tag === 'finish') {
                            color = 'green';
                        }
                        if (tag === 'pause') {
                            color = 'grey';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Delete</a>
                </Space>
            ),
        },
    ]

    const data = [
        {
            task: 'Notification',
            name: 'Custom1',
            method: 'chain',
            strategies: 'relative_strength_index ,triangular_moving_average',
            status: ['running'],
        },
        {
            task: 'Notification',
            name: 'Custom2',
            method: 'chain',
            strategies: 'relative_strength_index ,triangular_moving_average',
            status: ['finish'],
        },
        {
            task: 'Notification',
            name: 'Custom3',
            method: 'chain',
            strategies: 'relative_strength_index ,triangular_moving_average',
            status: ['pause'],
        },
    ];

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

    const onChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };

    const [form] = Form.useForm();

    useEffect(() => {
        axios
            .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
            .then(response => {
                const data = response.data.map((c) => {
                    return { value: c.symbol, label: c.symbol.toUpperCase() }
                })
                setCoins(data)
                console.log(data)
            })
    }, [])

    const [coins, setCoins] = useState([])

    const onFinish = (values) => {
    };

    return (
        <div className=''>
            <div className='space-y-5 mt-10 flex flex-col items-center w-full'>
                <p className='text-4xl font-bold'> Task</p>
                <p className=' text-gray-500 mb-4'> create your notification and place order here</p>
                <div className='flex w-full justify-center'>
                </div>
            </div>
            <div className='flex flex-col items-center relative space-y-2'>
                <Button type="" className='bg-blue-600 text-white hover:bg-blue-400 ' onClick={showModal}> Run Predict </Button>
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
                            name="currency"
                            rules={[{ required: true, message: 'Missing Currency' }]}
                            label='Currency'
                        >
                            <Select className='' placeholder='Currency' style={{ width: 145 }}>
                                {
                                    coins.map((c) => (
                                        <Select.Option value={c.value}>{c.label}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="strategy"
                            rules={[{ required: true, message: 'Missing Strategy' }]}
                            label='Strategy'
                        >
                            <Select className='' placeholder='Strategy' style={{ width: 145 }}>
                                {
                                    coins.map((c) => (
                                        <Select.Option value={c.value}>{c.label}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" className='bg-blue-600 text-white hover:bg-blue-400'>
                                Predict
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
}

export default Task