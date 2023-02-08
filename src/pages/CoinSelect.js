import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import CoinCard from '../components/CoinCard';
import { Avatar, List, Button, Spin, Tag } from 'antd';
import { LoadingOutlined , CheckCircleFilled, CloseCircleFilled} from '@ant-design/icons';

function CoinSelect() {

	const [coins, setCoins] = useState([])
	const [selected, setSelected] = useState([])
	const [loading, setLoading] = useState(true)

	const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


	const onSelect = (e, val) => {
		e.preventDefault()
		const temp = [...selected, val]
		setSelected(temp)
	}

	const onRemove = (e, val) => {
		e.preventDefault()
		const temp = selected.filter(c => c !== val)
		setSelected(temp)
	}

	useEffect(() => {
		console.log(selected);
	},[selected])

	useEffect(() => {
		axios
			.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
			.then(response => setCoins(response.data))
			.then(() => setLoading(false));
	}, [])

	return (
		<div className=''>
			<div className='space-y-5 mt-10 flex flex-col items-center w-full'>
				<p className='text-4xl font-bold'> Select your coin</p>
				<p className=' text-gray-500 mb-4'> we wil apply a suitable strategy for you</p>
				{
					!loading ?
						<List
							itemLayout="horizontal"
							dataSource={coins}
							className='relative w-2/6 h-96 overflow-scroll'
							renderItem={(coin) => (
								<List.Item>
									<List.Item.Meta
										avatar={<Avatar src={coin.image} />}
										title={<a href="https://ant.design">{coin.symbol}</a>}
										description={coin.name}
									/>
									{
										!selected.includes(coin)? 
										<CheckCircleFilled className='absolute right-0 text-green-400 text-xl mr-3' onClick={(e) => onSelect(e, coin)}/>
										:
										<CloseCircleFilled className='absolute right-0 text-red-400 text-xl mr-3' onClick={(e) => onRemove(e, coin)}/>
									}
								</List.Item>
							)}
						/> :
						<Spin indicator={antIcon} />
				}
				<button className='p-2 bg-blue-500 hover:bg-blue-400 px-5 text-white rounded-lg transition duration-200'>Save</button>
			</div>
		</div>
	)
}

export default CoinSelect