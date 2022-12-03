import { message, Modal, Table } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import BusForm from '../components/busForms/BusForm';
import { Button } from '../components/buttons/Button';
import PageTitle from '../components/pageTitles/PageTitle';
import { axiosInstance } from '../helpers/axiosInstance';
import { HideLoading, Showloading } from '../redux/alertsSlice';
// import { useReactToPrint } from 'react-to-print';
import ReactToPrint from 'react-to-print';

const Bookings = () => {
	const componentRef = useRef();
	const dispatch = useDispatch();
	const [bookings, setBookings] = useState([]);
	const [showPrintModal, setShowPrintModal] = useState(false);
	const [selectedBooking, setSelectedBooking] = useState(null);

	// console.log("SSEELECTED BOOKING", selectedBooking);
	// const axiosInstance = axios.create({
	// 	headers: {
	// 		Authorization: `Bearer ${localStorage.getItem('token')}`
	// 	}
	// });

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
						className="text-md underline text-secondary "
						onClick={() => {
							setSelectedBooking(record);
							setShowPrintModal(true);
						}}
					>
						Print Ticket
					</p>
				</div>
			),
		},
	];

	useEffect(() => {
		getBookings();
	}, []);


	const handleCancle = () => {
		setShowPrintModal(false);
		setSelectedBooking(null);
	};



	return (
		<div>
			<PageTitle title='Bookings' />

			<div className="mt-2">
				<Table dataSource={bookings} columns={columns} />
			</div>

			{showPrintModal && (
				<Modal

					title={"Print Ticket"}
					onCancel={handleCancle}
					open={showPrintModal}


					footer={[
						<ReactToPrint
							trigger={() => <Button print >Print</Button>}
							content={() => componentRef.current}
						/>,

						<Button onClick={handleCancle} >Cancle</Button>
					]}

				>

					<div className='d-flex flex-column p-5' ref={componentRef}>
						<p>Bus : {selectedBooking.name}</p>
						<p>
							{selectedBooking.from} - {selectedBooking.to}
						</p>
						<hr />
						<p>
							<span>Journey Date:</span>
							{selectedBooking.journeyDate}
						</p>
						<p>
							<span>Journey Time:</span> {selectedBooking.departure}
						</p>
						<hr />
						<p>
							<span>Seat Numbers:</span> <br />
							{selectedBooking.seats}
						</p>
						<hr />
						<p>
							<span>Total Amount:</span>{" "}
							{selectedBooking.fare * selectedBooking.seats.length} /-
						</p>
						<div>
						</div>

					</div>



				</Modal>
			)}
		</div>
	);
};

export default Bookings;