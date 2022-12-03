import React, { useEffect, useState } from 'react';


import { Col, Input, message, Row, Table } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { HideLoading, Showloading } from '../redux/alertsSlice';
import { axiosInstance } from '../helpers/axiosInstance';
import Bus from '../components/buses/Bus';
import { Button } from '../components/buttons/Button';

console.log("AXIOSSSSSS", axiosInstance);



const Home = () => {
	const dispatch = useDispatch();
	const [buses, setBuses] = useState([]);
	const [filters, setFilters] = useState({});
	const { user } = useSelector(state => state.users);


	const handleSearch = (e) => {
		setFilters({ ...filters, [e.target.name]: e.target.value });
	};

	const getFiltered = () => {

		const tempFilters = {};
		Object.keys(filters).forEach(key => {
			if (filters[key]) {
				tempFilters[key] = filters[key];
			}
		});

		getBuses(tempFilters);
	};

	const clearHandler = () => {
		console.log('clear');
		setFilters({
			from: "",
			to: "",
			journeyDate: "",
		});
		getBuses();
	};

	console.log("Search is", filters);

	const getBuses = async (all = {}) => {

		try {
			dispatch(Showloading());
			const response = await axios.post('http://localhost:5001/api/buses/get-all-buses', all, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			});
			dispatch(HideLoading());

			//we can add store
			if (response.data.success) {
				setBuses(response.data.data);
			}
			else {
				message.error("error.message-2");
				message.error(response.data.message);
			}
		} catch (error) {
			dispatch(HideLoading());
			message.error("error.message-3");
			message.error(error.message);
		}
	};
	useEffect(() => {
		getBuses();
	}, []);
	return (
		<div >
			<div className='mt-1 mb-2   py-1'>
				<Row gutter={[10, 10]} align='center' >
					<Col lg={6} sm={24}>
						<Input

							type='text'
							name='from'
							placeholder='From'
							value={filters.from}
							onChange={handleSearch}
						/>
					</Col>
					<Col lg={6} sm={24}>
						<Input

							type='text'
							name='to'
							placeholder='To'
							value={filters.to}
							onChange={handleSearch}
						/>
					</Col>
					<Col lg={6} sm={24}>
						<Input

							type='date'
							name='journeyDate'
							placeholder='Date'
							value={filters.journeyDate}
							onChange={handleSearch}
						/>
					</Col>
					<Col lg={6} sm={24}>
						<div className="d-flex gap-2">
							<Button search onClick={getFiltered}> Filter</Button>
							<Button clear onClick={clearHandler}> Clear</Button>

						</div>
					</Col>
				</Row>
			</div>
			<div>
				<Row gutter={[15, 15]}>
					{buses.filter(bus => bus.status === "Yet To Start").map(bus => (
						<Col key={bus._id} lg={12} sm={24} xs={24}  >
							<Bus bus={bus} />
						</Col>
					))}
				</Row>
			</div>
		</div>
	);
};

export default Home;