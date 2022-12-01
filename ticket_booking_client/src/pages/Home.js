import React, { useEffect, useState } from 'react';


import { Col, message, Row, Table } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { HideLoading, Showloading } from '../redux/alertsSlice';
import { axiosInstance } from '../helpers/axiosInstance';
import Bus from '../components/buses/Bus';



const Home = () => {
	const dispatch = useDispatch();
	const [buses, setBuses] = useState([]);
	const { user } = useSelector(state => state.users);

	const getBuses = async () => {
		try {
			dispatch(Showloading());
			const response = await axiosInstance.post('http://localhost:5001/api/buses/get-all-buses', {});
			dispatch(HideLoading());

			//we can add store
			if (response.data.success) {
				setBuses(response.data.data);
			}
			else {
				message.error(response.data.message);
			}
		} catch (error) {
			dispatch(HideLoading());
			message.error(error.message);
		}
	};
	useEffect(() => {
		getBuses();
	}, []);
	return (
		<div>
			<div>

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