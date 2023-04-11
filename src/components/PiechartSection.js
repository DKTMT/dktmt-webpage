import React, { PureComponent, useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import axios from 'axios'
import { Avatar, List } from 'antd'

const PieChartSection = (props) => {

  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group C', value: 230 },
    { name: 'Group C', value: 320 },
  ];

  const COLORS = [
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c",
    "#d62728",
    "#9467bd",
    "#8c564b",
    "#e377c2",
    "#7f7f7f",
    "#bcbd22",
    "#17becf",
    "#aec7e8",
    "#ffbb78",
    "#98df8a",
    "#ff9896",
    "#c5b0d5",
    "#c49c94",
    "#f7b6d2",
    "#c7c7c7",
    "#dbdb8d",
    "#9edae5"
  ];


  const [coins, setCoins] = useState([])
  const [coinsData, setCoinsData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log(props.coins);
    const data = props.coins.map((c) => {
      return { 'name': c.asset, 'value': c.free_value}
    })
    setCoinsData(data)
  }, [])

  return (
    <div className=''>
      <p className="font-bold text-3xl"> Your Portfolio</p>
      <p className='text-gray-500'> Last Updated</p>
      <div className='flex flex-col items-center'>
        <ResponsiveContainer aspect={1} width='55%'>
          <PieChart>
            <Pie data={coinsData} innerRadius="80%" outerRadius="100%"
              paddingAngle={0}
              dataKey="value" >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={props.coins}
        className='relative h-96 overflow-scroll w-full'
        renderItem={(coin) => (
          <List.Item className=''>
            <List.Item.Meta
              avatar={<Avatar src={coin.icon} />}
              title={<a href="https://ant.design">{coin.asset}</a>}
            />
            <div className=' flex flex-col '>
              <p>{((coin.free_value/props.port_value)*100).toFixed(2)} %</p>
              <p >{coin.free_value.toFixed(2)} USD</p>
            </div>
          </List.Item>
        )}
      />:
    </div>
  );

}

export default PieChartSection