import React, { useEffect } from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Select, Modal, List, message } from 'antd';
import { useState } from 'react';
import { EditOutlined, DeleteOutlined, RightCircleOutlined } from '@ant-design/icons'
import Num from '../components/Num'
import axios from 'axios';


const confident_level_list = [{ label: "Very High", level: 4 }, { label: "High", level: 3 }, { label: "Very Medium", level: 2 }, { label: "Low", level: 1 }]

function Strategy() {

    const [form] = Form.useForm();

    const [strategys, setStrategy] = useState([])
    const [strategyList, setStrategyList] = useState([])
    const [type, setType] = useState(null)

    const onFinish = (values) => {
        const tokenStr = localStorage.getItem('user')
        console.log('Received values of form:', values);
        console.log(values);
        const chainstrategy = values.strategy_order.map((s) => s.strategy)
        const body = {
            name: values.name,
            method: {
                name: type,
                strategies: type === 'chain' ? chainstrategy : values.strategy_order
            },
            public: true,
            anonymous: true,
        }
        // setIsModalOpen(false)
        console.log(body);
        form.resetFields()
        axios.post('http://localhost:8000/api/predict/strategy/custom', body, { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then(res => {
                res.statusCode = 201 ? fetchStrategy() : "";
                messaging('Strategy Added success', 'success')
                setIsModalOpen(false)
            })
            .catch(error => {
                console.log(error);
                messaging('Strategy Added Failed: Duplicate Strategy Name!!', 'error')
            })
    };

    const fetchStrategy = () => {
        const tokenStr = localStorage.getItem("user");
        axios.get('http://localhost:8000/api/predict/strategy/custom', { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then(res => {
                setStrategy(res.data.strategies)
                const data = res.data.strategies.map((ele) => {
                    if (ele.method.name === 'chain') {
                        return { name: ele.name, desc: ele.method.order }
                    }
                    else {
                        return { name: ele.name, desc: ele.method.poll }
                    }

                })
                console.log(res.data);
            })


    }

    useEffect(() => {
        const tokenStr = localStorage.getItem('user')
        axios.get('http://localhost:8000/api/predict/strategy', { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then(res => {
                setStrategyList(res.data.strategies);
            })
        fetchStrategy()
    }, [])

    useEffect(() => {

    }, [strategys])


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleStrategyChange = (value) => {
        setType(value)
    };

    const deleteStrategy = (e, id) => {
        const tokenStr = localStorage.getItem('user')
        e.preventDefault()
        axios.delete(
            "http://localhost:8000/api/predict/strategy/custom"
            , {
                headers: { "Authorization": `Bearer ${tokenStr}` },
                data: { id: id }
            })
            .then(() => {
                fetchStrategy()
                messaging('Strategy Delete successfully!', 'success')
            } )
            .catch(() => messaging('Strategy Delete failed', 'error'))

    }

    const messaging = (msg, type) => {
        messageApi.open({
            type: type,
            content: msg,
        });
    };

    return (
        <div className='flex flex-col items-center'>
            {contextHolder}
            <p className='text-4xl font-bold mt-12'> Strategy</p>
            <p className=' text-gray-500 mb-4'> Let's choose your trading strategy here</p>
            <Button onClick={showModal}>
                Add Strategy
            </Button>
            <List
                itemLayout="horizontal"
                dataSource={strategys}
                className="mt-3"
                style={{ width: 550 }}
                renderItem={(item, index) => (
                    <List.Item className="flex">
                        <List.Item.Meta
                            avatar={<p className='text-xl'> {index + 1 + '.'} </p>}
                            title={<a>{item.name}</a>}
                            description={<p> type: {item.method.name} </p>}
                            key={index}
                        />
                        <div className='flex' key={index+1}>
                            <div className='w-72'>
                                {
                                    <p className='Text-lg font-bold'>{item.method.name === "poll" ? "Strategies" : "Chain Order"}</p>
                                }
                                {
                                    item.method.name === "poll" ?
                                        item.method.strategies.map((s, idx) => (
                                            <div key={Math.random()}>
                                                <p>
                                                    {idx + 1}. {s.strategy}
                                                </p>
                                                <p className='text-gray-400'>
                                                    Confident Level: {s.vote}
                                                </p>
                                            </div>
                                        ))
                                        : item.method.name === "chain" ?
                                            item.method.strategies.map((s, idx) => (
                                                <p key={Math.random()}>
                                                    {idx + 1}. {s}
                                                </p>
                                            ))
                                            :
                                            <div></div>
                                }
                            </div>
                            <div className='right-0 mr-4 space-x-4'>
                                <DeleteOutlined onClick={(e) => {
                                    deleteStrategy(e, item.id)
                                }} />
                            </div>
                        </div>
                    </List.Item>
                )}
            />




            <Modal title="Add new custom strategy" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[
                ]}>

                <Select className='' placeholder='Strategy type' style={{ width: 145 }} onChange={handleStrategyChange}>
                    <Select.Option value="chain">Chain</Select.Option>
                    <Select.Option value="poll">Poll</Select.Option>
                </Select>
                {
                    type === "chain" ?
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
                                                                <Select.Option value={strategy.id} key={Math.random()}>{strategy.name}</Select.Option>
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
                        : type === "poll" ?
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
                                                        <Select className='' placeholder='Strategy' style={{ width: 300 }}>
                                                            {
                                                                strategyList.map((strategy) => (
                                                                    <Select.Option value={strategy.id} key={Math.random()}>{strategy.name}</Select.Option>
                                                                ))
                                                            }
                                                        </Select>
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'vote']}
                                                        rules={[{ required: true, message: 'Missing confident level' }]}
                                                    >
                                                        <Select className='' placeholder='Confident Level' style={{ width: 145 }}>
                                                            {
                                                                confident_level_list.map((conf) => (
                                                                    <Select.Option value={conf.level} key={Math.random()}>{conf.label}</Select.Option>
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
                            :
                            <></>
                }

            </Modal>
        </div>
    )
}

export default Strategy