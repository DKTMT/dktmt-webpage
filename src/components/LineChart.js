import React, { useEffect, useState, PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton } from 'antd'
import axios from 'axios'


const LineChart = (props) => {

  const [ port, setPort ] = useState([])
  const [ data, setData ] = useState([])
  const [ loading, setLoading ] = useState(true)

  const convertTimeStampToDate = (timestamp) => {
    const date = new Date(timestamp); // Multiply by 1000 to convert from seconds to milliseconds

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]

    const dateString = `${year}-${monthNames[month]}-${day}`;
    return dateString

  }

  useEffect(() => {
    const tokenStr = localStorage.getItem('user')
    axios.get('http://localhost:8000/api/exchange/binance/port/history', { headers: { "Authorization": `Bearer ${tokenStr}` }, data: {range: 7}})
    .then((res) => {
      setPort(res.data)
      const data = res.data.snapshotVos.map((ele) => {
        return {name: convertTimeStampToDate(ele.updateTime), value: ele.value}
      })
      setData(data)
      setLoading(false)
    })
    .catch(error => {
      setLoading(false)
    })


  }, [])

  if (loading){
    return (
      <Skeleton active />
    )
  }


  return (
    <div className=' '>
      <p className='text-2xl mb-5 font-bold'> Performance</p>
      <ResponsiveContainer height="85%" width="100%">
        <AreaChart
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />}/>
          <YAxis dataKey="value"/>
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChart

class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, stroke, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} fill="#666" textAnchor="end" className='text-sm' transform="rotate(-20)">
          {payload.value}
        </text>
      </g>
    );
  }
}