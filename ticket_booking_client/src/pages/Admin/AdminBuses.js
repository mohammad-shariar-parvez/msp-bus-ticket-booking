import { message, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import BusForm from '../../components/busForms/BusForm';
import { Button } from '../../components/buttons/Button';
import PageTitle from '../../components/pageTitles/PageTitle';
import { axiosInstance } from '../../helpers/axiosInstance';
import { HideLoading, Showloading } from '../../redux/alertsSlice';

const AdminBuses = () => {
	const [showBusForm, setShowBusForm] = useState(false);
	const dispatch = useDispatch();
	const [buses, setBuses] = useState([]);
	const [selectedBus, setSelectedBus] = useState(null);

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

	const deleteBus = async (id) => {

		try {
			dispatch(Showloading());
			const response = await axiosInstance.post("http://localhost:5001/api/buses/delete-bus", {
				_id: id,
			});
			dispatch(HideLoading());
			if (response.data.success) {
				message.success(response.data.message);
				getBuses();
			} else {
				message.error(response.data.message);
			}
		} catch (error) {
			dispatch(HideLoading());
			message.error(error.message);
		}
	};

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
		},
		{
			title: "Number",
			dataIndex: "number",
		},
		{
			title: "From",
			dataIndex: "from",
		},
		{
			title: "To",
			dataIndex: "to",
		},
		{
			title: "Journey Date",
			dataIndex: "journeyDate",
		},
		{
			title: "Status",
			dataIndex: "status",
		},
		{
			title: "Action",
			dataIndex: "action",
			render: (action, record) => (

				<div className="d-flex gap-3">
					<i class="ri-delete-bin-line"
						onClick={() => {

							deleteBus(record._id);
						}}></i>
					<i class="ri-pencil-line" onClick={() => {

						setSelectedBus(record);
						setShowBusForm(true);
					}}></i>
				</div>
			)
		},
	];
	// 2 ways to send record id , here we cant but for delete we can
	useEffect(() => {
		getBuses();
	}, []);

	return (
		<div>
			<div className='d-flex justify-content-between align-items-center'>
				<PageTitle title='Buses' />
				<Button addBuss onClick={() => setShowBusForm(true)} >Add Bus</Button>

			</div>
			<Table dataSource={buses} columns={columns} />

			{showBusForm && (
				<BusForm
					showBusForm={showBusForm}
					setShowBusForm={setShowBusForm}
					type={selectedBus ? 'edit' : 'add'}
					selectedBus={selectedBus}
					setSelectedBus={setSelectedBus}
					getData={getBuses}

				/>
			)}
		</div>
	);
};

export default AdminBuses;