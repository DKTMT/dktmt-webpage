import React, { PureComponent, useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import axios from 'axios'
import { Avatar, List } from 'antd'

const PieChartSection = () => {

  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group C', value: 230 },
    { name: 'Group C', value: 320 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
      axios
        .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
        .then(response => setCoins(response.data))
        .then(() => setLoading(false));
    }, []);

  return (
    <div className=''>
      <p className="font-bold text-3xl"> Your Portfolio</p>
      <p className='text-gray-500'> Last Updated</p>
      <div className='flex flex-col items-center'>
        <ResponsiveContainer aspect={1} width='55%'>
          <PieChart>
            <Pie data={data} innerRadius="80%" outerRadius="100%" fill="#8884d8"
              paddingAngle={5}
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
              dataSource={coins}
              className='relative h-96 overflow-scroll w-full'
              renderItem={(coin) => (
              <List.Item>
                  <List.Item.Meta
                  avatar={<Avatar src={coin.image} />}
                  title={<a href="https://ant.design">{coin.symbol}</a>}
                  description={coin.name}
                  />
                  <div className='absolute right-0'>
                    <p> 53% </p>
                    <p> 1329 USD </p>
                  </div>
              </List.Item>
              )}
          />:      
    </div>
  );

}

export default PieChartSection