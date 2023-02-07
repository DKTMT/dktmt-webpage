import React, { PureComponent, useEffect } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group C', value: 230 },
  { name: 'Group C', value: 320 },
];

// const client = Binance({
//     apiKey: 'w2fmRdBVpZROxMkS96PlBgqzDv7mAJ4Of4zz8oWpOeNddcYA5dYVfmaNc2SOkRq2',
//     apiSecret: 'mSw2jrKwRggwJWHFeVLLENnkLnkZX2s6OpAHYIoFLktetgegQUkj0AuW5CO9b14J',
//   })

// useEffect(() => {
//     client.accountInfo().then((val) => {
//         console.log(val)
//     })
// }, [])

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o';

  render() {
    return (
      <div className=''>
        <p className="font-bold text-3xl"> Your Portfolio</p>
        <p className='text-gray-500'> Last Updated</p>
        <div className='flex flex-col items-center'>
          <ResponsiveContainer aspect={1} width='70%'>
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
      </div>
    );
  }
}