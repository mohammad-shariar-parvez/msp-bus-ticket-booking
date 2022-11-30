import { message, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import BusForm from '../components/busForms/BusForm';
import { Button } from '../components/buttons/Button';
import PageTitle from '../components/pageTitles/PageTitle';
import { axiosInstance } from '../helpers/axiosInstance';
import { HideLoading, Showloading } from '../redux/alertsSlice';

const Bookings = () => {
	const dispatch = useDispatch();
	const [bookings, setBookings] = useState([]);

	const getBookings = async () => {
		try {
			dispatch(Showloading());
			const response = await axiosInstance.post('http://localhost:5001/api/bookings/get-bookings-by-user-id', {});
			dispatch(HideLoading());

			//we can add store
			if (response.data.success) {
				const mappedData = response.data.data.map((booking) => {
					return {
						...booking,
						...booking.bus,
						...booking.user
					};
				});

				console.log("Bookings is", response);
				setBookings(mappedData);
			}
			else {
				message.error(response.data.message);
			}
		} catch (error) {
			dispatch(HideLoading());
			message.error(error.message);
		}
	};

	const columns = [
		{
			title: "Bus Name",
			dataIndex: "name",
			key: "bus",
		},
		{
			title: "Bus Number",
			dataIndex: "number",
			key: "bus",
		},
		{
			title: "Journey Date",
			dataIndex: "journeyDate",
		},
		{
			title: "Journey Time",
			dataIndex: "departure",
		},
		{
			title: "Seats",
			dataIndex: "seats",
			render: (seats) => {
				return seats.join(", ");
			},
		},
		{
			title: "Action",
			dataIndex: "action",
			render: (text, record) => (
				<div>
					<p
						className="text-md underline"
						onClick={() => {
							setSelectedBooking(record);
							setShowPrintModal(true);
						}}
					>
						Print Ticekt
					</p>
				</div>
			),
		},
	];




	useEffect(() => {
		getBookings();
	}, []);

	return (
		<div>
			<PageTitle title={Bookings} />
			<Table dataSource={bookings} columns={columns} />
		</div>
	);
};

export default Bookings;