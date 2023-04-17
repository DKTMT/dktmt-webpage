import React from 'react'
import { Space, Table, Tag } from 'antd';
import { Modal, Button } from 'antd';
import { useState, useEffect, useNavigate } from 'react';
import { Select } from 'antd';
import { Form, Input, List, Spin, message } from 'antd';
import { LoadingOutlined, DeleteOutlined, PauseOutlined, CaretRightOutlined } from '@ant-design/icons'
import axios from 'axios'

function Task() {

    const mode = [
        {
            label: "buy",
            value: "buy"
        },
        {
            label: "sell",
            value: "sell"
        },
        {
            label: "all",
            value: "all"
        },
    ]

    const columns = [
        {
            title: 'Ticket',
            dataIndex: 'task',
            key: 'task',
            render: (text) => <a>Notification</a>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Strategies',
            dataIndex: 'strategies',
            key: 'strategies',
            render: (_, { strategies }) => (
                <>
                    {strategies.map((s, idx) => {
                        return (
                            <div className='flex flex-col' key={Math.random()}>
                                <p>{idx + 1}. {s}</p>
                            </div>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Timeframe',
            dataIndex: 'timeframe',
            key: 'timeframe',
        },
        {
            title: 'Period',
            dataIndex: 'period',
            key: 'period',
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: 'Created',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (status) => {
                let color = 'blue'
                if (status === 'open') {
                    color = 'green';
                }
                if (status === 'close') {
                    color = 'red';
                }
                return (
                    <Tag color={color} key={status}>
                        {status.toUpperCase()}
                    </Tag>
                );
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {
                        record.status == 'pause' ? <CaretRightOutlined onClick={() => editTask(record, 'open')} />: record.status == 'close' ? <CaretRightOutlined onClick={() => editTask(record, 'open')}/> : <PauseOutlined onClick={() => editTask(record, 'pause')}/> 
                    }
                    <DeleteOutlined onClick={() => deleteTask(record)} />
                </Space>
            ),
        },
    ]

    const backtestColumns = [
        {
            title: 'Strategy',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Number of buy/sell',
            dataIndex: 'number_of_buy_sell',
            key: 'number_of_buy_sell',
        },
        {
            title: 'Accuracy',
            dataIndex: 'accuracy_of_buy_sell',
            key: 'accuracy_of_buy_sell',
        },
    ]

    const predictionColumns = [
        {
            title: 'Strategy',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Result',
            dataIndex: 'result',
            key: 'result',
            render: (text) => <p className={text == 'buy' ? 'text-green-500' : text == 'sell' ? "text-red-500" : "text-yellow-500"}>
                {text}
            </p>
        },
    ]

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isPredictModalOpen, setIsPredictModalOpen] = useState(false)
    const [strategies, setStrategies] = useState([])
    const [baseStrategies, setBaseStrategies] = useState([])
    const [line, setLine] = useState(false)
    const [authUrl, setAuthUrl] = useState('')
    const [onShowResult, setOnShowResult] = useState(false)
    const [tasks, setTasks] = useState([])
    const [pageLoading, setPageLoading] = useState(true)
    const [currentTask, setCurrentTask] = useState('')
    const antIcon = <LoadingOutlined style={{ fontSize: 20 }} className='text-white pb-4' spin />;
    const loadingIcon = <LoadingOutlined style={{ fontSize: 150 }} spin />;


    const showModal = () => {
        setIsModalOpen(true);
    };

    const showPredictModal = () => {
        setIsPredictModalOpen(true);
    }

    const handleOk = () => {
        setIsModalOpen(false);
        setIsPredictModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setIsPredictModalOpen(false);
    };

    const onhandleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const [form] = Form.useForm();
    const tokenStr = localStorage.getItem('user')

    const deleteTask = (record) => {
        console.log(record);

        axios.delete(
            "http://localhost:8000/api/task/schedule_predict"
            , {
                headers: { "Authorization": `Bearer ${tokenStr}` },
                data: { name: record.name }
            })
            .then(() => {
                messaging('Delete ticket: ' + record.name + ' successfully!', 'success')
                fetchTicket()
            })
            .catch(error => {
                messaging('Delete ticket: ' + record.name + ' failed!', 'error')
            })
    }

    const editTask = (record, action) => {
        console.log(record);
        axios.put(
            "http://localhost:8000/api/task/schedule_predict", { name: record.name, status: action }
            , {
                headers: { "Authorization": `Bearer ${tokenStr}` }
            })
            .then(() => {
                messaging(action + ' ticket: '  + record.name + ' successfully!', 'success')
                fetchTicket()
            })
            .catch(error => {
                messaging(action + ' ticket: ' + record.name + ' failed!', 'error')
            })
    }

    const fetchTicket = () => {
        axios
            .get("http://localhost:8000/api/task/schedule_predict", { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then(response => {
                console.log(response.data.tickets)
                const data = response.data.tickets.map(t => {
                    return {...t, key: Math.random()}
                })
                console.log(data);
                setTasks(data)
            })
    }

    useEffect(() => {
        axios
            .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
            .then(response => {
                const data = response.data.map((c) => {
                    return { value: c.symbol.toUpperCase(), label: c.symbol.toUpperCase() }
                })
                setCoins(data)
            })
        axios
            .get("http://localhost:8000/api/predict/strategy/custom", { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then(response => {
                setStrategies(response.data.strategies)
            })
        axios
            .get("http://localhost:8000/api/predict/strategy", { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then(response => {
                setBaseStrategies(response.data.strategies, ...strategies)
            })
        axios
            .get("http://localhost:8000/api/notify/line_notify/validate", { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then(res => {
                setLine(res.data.result)
                setPageLoading(false)
                if (!line) {
                    axios
                        .get("http://localhost:8000/api/notify/line_notify/generate_auth_url", { headers: { "Authorization": `Bearer ${tokenStr}` } })
                        .then(res => {
                            setAuthUrl(res.data.auth_url)
                        })
                }
            })
        fetchTicket()
    }, [])

    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [predictionResult, setPredictionResult] = useState([])
    const [backtestResult, setBackTestResult] = useState([])
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = (values) => {
        console.log(values);
        const body = {
            name: values.name,
            duration: values.duration,
            period: values.period,
            symbol: values.symbol + "USDT",
            timeframe: values.timeframe,
            exchange: values.exchange,
            mode: values.mode,
            strategies: values.strategies
        }
        console.log(body);
        axios.post('http://localhost:8000/api/task/schedule_predict', body, { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then(res => {
                console.log(res.data);
                messaging('add Ticket successfully', 'success')
                fetchTicket()
                setIsModalOpen(false)
            })
            .catch(err => {
                messaging('add Ticket failed (Duplicate Ticket name!)', 'error')
            })
    };

    const timeframe = ["1m", "3m", "5m", "15m", "30m", "1h", "2h", "4h", "6h", "8h", "12h", "1d", "3d", "1w", "1M"]

    const handleClick = (e) => {
        e.preventDefault()
        window.location.href = authUrl;
    };

    const messaging = (msg, type) => {
        messageApi.open({
            type: type,
            content: msg,
        });
    };

    const onPredicitionFinish = (values) => {
        setLoading(true)
        const body = {
            symbol: values.symbol + "USDT",
            timeframe: values.timeframe,
            exchange: values.exchange,
            strategies: values.strategies
        }
        let url = ''
        if (values.run === 'Prediction') {
            url = "http://localhost:8000/api/predict/run"
        }
        if (values.run === 'Backtest') {
            url = "http://localhost:8000/api/predict/backtest"
        }
        setCurrentTask(values.run)
        console.log(values);
        axios.post(url, body, { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then(res => {
                console.log(res.data.results);
                if (values.run === 'Prediction') {
                    const data = Object.keys(res.data.results).map(key => {
                        return { 'name': key, 'result': res.data.results[key] }
                    })
                    console.log(data);
                    messaging('Prediction Task Complete!', 'success')
                    setPredictionResult(data)
                }
                if (values.run === 'Backtest') {
                    const data = res.data.results.map(strategy => {
                        console.log(strategy);
                        return { 'name': strategy.name, 'number_of_buy_sell': strategy.number_of_buy_sell, 'accuracy_of_buy_sell': (strategy.accuracy_of_buy_sell * 100).toFixed(2) + '%' }
                    })
                    console.log(data);
                    messaging('Backtest Task Complete!', 'success')
                    setBackTestResult(data)
                }
                setLoading(false)
                setOnShowResult(true)
            })
            .catch(
                error => {
                    console.log(error);
                    setLoading(false)
                    messaging('Task failed: ' + error, 'error')
                }
            )
    };

    if (pageLoading) {
        return (
            <div className='flex justify-center min-h-screen mt-40'>
                <Spin indicator={loadingIcon} />
            </div>
        )
    }

    return (
        <>
            {
                !line ?
                    <div className=''>
                        {contextHolder}
                        <div className='space-y-5 mt-10 flex flex-col items-center w-full'>
                            <p className='text-4xl font-bold'> Ticket</p>
                            <p className=' text-gray-500 mb-4'> please register our Line notify here.</p>
                            <div className='flex w-full justify-center space-x-4'>
                                <Button type="" className='bg-green-500 text-white hover:bg-blue-400 ' onClick={e => handleClick(e)}> Register Line Notify </Button>
                                <Button type="" className='bg-blue-600 text-white hover:bg-blue-400 ' onClick={showPredictModal}> Run Prediction/Backtest </Button>
                            </div>
                        </div>
                    </div>

                    :
                    <div>
                        {contextHolder}
                        <div className='space-y-5 mt-10 flex flex-col items-center w-full'>
                            <p className='text-4xl font-bold'> Ticket</p>
                            <p className=' text-gray-500 mb-4'> create your notification and place order here.</p>
                            <div className='flex w-full justify-center'>
                            </div>
                        </div>
                        <div className='flex flex-col items-center relative space-y-2'>
                            <div>
                                <div className='flex w-full justify-end space-x-2 mb-2'>
                                    <Button type="" className='bg-blue-600 text-white hover:bg-blue-400 ' onClick={showModal}> Add Ticket </Button>
                                    <Button type="" className='bg-blue-600 text-white hover:bg-blue-400 ' onClick={showPredictModal}> Run Prediction/Backtest </Button>
                                </div>
                                <Table columns={columns} dataSource={tasks} />
                            </div>
                        </div>
                    </div>
            }

            <Modal title="Cryptocurrency Prediction/Backtest" open={isPredictModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[
                ]}>
                <Form
                    name="dynamic_form_nest_item"
                    onFinish={onPredicitionFinish}
                    className='mt-4'
                    form={form}
                >
                    <Form.Item
                        name="run"
                        rules={[{ required: true, message: 'Missing Run Task' }]}
                        label='Run task'
                    >
                        <Select className='' placeholder='Task' style={{ width: 300 }} onChange={onhandleChange}>
                            <Select.Option value={'Backtest'}>{'Backtest'}</Select.Option>
                            <Select.Option value={'Prediction'}>{'Prediction'}</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="symbol"
                        rules={[{ required: true, message: 'Missing Currency' }]}
                        label='Currency'
                    >
                        <Select className='' placeholder='Currency' style={{ width: 145 }} optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input.toUpperCase())} showSearch
                            options={coins} />
                    </Form.Item>
                    <Form.Item
                        name="strategies"
                        rules={[{ required: true, message: 'Missing Strategy' }]}
                        label='Strategy'
                    >
                        <Select className='' placeholder='Strategy' style={{ width: 300 }} tokenSeparators={[',']} mode="tags" onChange={onhandleChange}>
                            {
                                strategies.map((s) => (
                                    <Select.Option value={s.id} key={Math.random()}
                                    >{s.name}</Select.Option>
                                ))
                            }
                            {
                                baseStrategies.map((s) => (
                                    <Select.Option value={s.id} key={Math.random()}
                                    >{s.name}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="timeframe"
                        rules={[{ required: true, message: 'Please input your Ticket timeframe' }]}
                        label="Timeframe"
                    >
                        <Select className='' placeholder='Timeframe' style={{ width: 140 }}>
                            {
                                timeframe.map((tf) => (
                                    <Select.Option value={tf} key={Math.random()}
                                    >{tf}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="exchange"
                        rules={[{ required: true, message: 'Please input your Ticket exchange' }]}
                        label="Exchange"
                    >
                        <Select className='' placeholder='exchange' style={{ width: 145 }}>
                            <Select.Option value={'binance'}>Binance</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" className='bg-blue-600 text-white hover:bg-blue-400'>
                            {
                                loading ? <Spin indicator={antIcon} /> : "Predict"
                            }
                        </Button>
                    </Form.Item>
                </Form>
                {
                    onShowResult && currentTask === 'Prediction' ?
                        <div className=''>
                            <p className='text-lg font-bold'> Prediction Result </p>
                            <Table columns={predictionColumns} dataSource={predictionResult} />
                        </div>
                        :
                        onShowResult && currentTask === 'Backtest' ?
                            <div>
                                <p className='text-lg font-bold mb-2'> Backtest Result </p>
                                <Table columns={backtestColumns} dataSource={backtestResult} />
                            </div>
                            :
                            <div></div>
                }
            </Modal>






            <Modal title="Add new Ticket" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
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
                        rules={[{ required: true, message: 'Please input your Ticket name' }]}
                        label="Name"
                    >
                        <Input placeholder="Ticket name" />
                    </Form.Item>
                    <div className='flex flex-row space-x-5'>
                        <Form.Item
                            name="duration"
                            rules={[{ required: true, message: 'Please input your Ticket duration' }]}
                            label="Duration"
                        >
                            <Select className='' placeholder='Ticket Duration' style={{ width: 140 }}>
                                {
                                    timeframe.map((tf) => (
                                        <Select.Option value={tf} key={Math.random()}
                                        >{tf}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="period"
                            rules={[{ required: true, message: 'Please input your Ticket period' }]}
                            label="Period"
                        >
                            <Select className='' placeholder='Ticket Peroid' style={{ width: 140 }}>
                                {
                                    timeframe.map((tf) => (
                                        <Select.Option value={tf} key={Math.random()}
                                        >{tf}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </div>
                    <Form.Item
                        name="symbol"
                        rules={[{ required: true, message: 'Missing Currency' }]}
                        label='Currency'
                    >
                        <Select className='' placeholder='Currency' style={{ width: 145 }} optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input.toUpperCase())} showSearch
                            options={coins} />
                    </Form.Item>
                    <Form.Item
                        name="strategies"
                        rules={[{ required: true, message: 'Missing Strategy' }]}
                        label='Strategies'
                    >
                        <Select className='' placeholder='Strategy' style={{ width: 300 }} tokenSeparators={[',']} mode="tags" onChange={onhandleChange}>
                            {
                                strategies.map((s) => (
                                    <Select.Option value={s.id} key={Math.random()}
                                    >{s.name}</Select.Option>
                                ))
                            }
                            {
                                baseStrategies.map((s) => (
                                    <Select.Option value={s.id} key={Math.random()}
                                    >{s.name}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="timeframe"
                        rules={[{ required: true, message: 'Please input your Ticket timeframe' }]}
                        label="Timeframe"
                    >
                        <Select className='' placeholder='Timeframe' style={{ width: 140 }}>
                            {
                                timeframe.map((tf) => (
                                    <Select.Option value={tf} key={Math.random()}
                                    >{tf}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="exchange"
                        rules={[{ required: true, message: 'Please input your Ticket exchange' }]}
                        label="Exchange"
                    >
                        <Select className='' placeholder='exchange' style={{ width: 145 }}>
                            <Select.Option value={'binance'}>Binance</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="mode"
                        rules={[{ required: true, message: 'Please input your Ticket mode' }]}
                        label="Mode"
                    >
                        <Select className='' placeholder='exchange' style={{ width: 145 }}>
                            {
                                mode.map((m) => {
                                    return <Select.Option value={m.value} key={Math.random()}>{m.label}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" className='bg-blue-600 text-white hover:bg-blue-400'>
                            Add Ticket
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default Task