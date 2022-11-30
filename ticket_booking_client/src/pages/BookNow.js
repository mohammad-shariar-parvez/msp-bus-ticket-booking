import React, { useEffect, useState } from 'react';
import { HideLoading, Showloading } from '../redux/alertsSlice';
import { Col, message, Row, Table } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Bus from '../components/buses/Bus';
import { axiosInstance } from '../helpers/axiosInstance';
import { useParams } from 'react-router-dom';
import SeatSelection from '../components/seatSelections/SeatSelection';
import { Button } from '../components/buttons/Button';


const BookNow = () => {
	const [selectedSeats, setSelectedSeats] = useState([]);
	const dispatch = useDispatch();
	const [bus, setBus] = useState(null);
	const params = useParams();



	const getBus = async () => {
		try {
			dispatch(Showloading());
			const response = await axiosInstance.post('http://localhost:5001/api/buses/get-bus-by-id', {
				_id: params.id
			});
			dispatch(HideLoading());

			//we can add store
			if (response.data.success) {
				// console.log("CROSS CHWECK", response.data.data);
				setBus(response.data.data);
			}
			else {
				message.error(response.data.message);
			}
		} catch (error) {
			dispatch(HideLoading());
			message.error(error.message);
		}
	};

	const bookNow = async () => {
		try {
			dispatch(Showloading());
			const response = await axiosInstance.post("http://localhost:5001/api/bookings/book-seat", {
				bus: bus._id,
				seats: selectedSeats
			});
			// bus.seatsBooked = response.data.seatsBooked;
			// console.log("Selected seats", response.data.seatsBooked);
			getBus();

			dispatch(HideLoading());
			if (response.data.success) {
				message.success(response.data.message);
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
		getBus();
	}, []);
	return (
		<div>
			{
				bus &&
				(<Row className='mt-3' gutter={20}>
					<Col lg={12} sm={24} xs={24}>
						<h1 className="text-xl text-secondary">{bus.name}</h1>
						<h1 className="text-md">{bus.from} - {bus.to}</h1>
						<hr />

						<div className="d-flex flex-column gap-1">
							<p className="text-md">
								Jourey Date : {bus.journeyDate}
							</p>
							<p className="text-md">
								Fare : $ {bus.fare} /-
							</p>
							<p className="text-md">
								Departure Time : {bus.departure}
							</p>
							<p className="text-md">
								Arrival Time : {bus.arrival}
							</p>
							<p className="text-md">
								Capacity : {bus.capacity}
							</p>
							<p className="text-md">
								Seats Left : {bus.capacity}
								{/* Seats Left : {bus.capacity - bus.seatsBooked.length} */}
							</p>
						</div>
						<hr />
						<div className="d-flex flex-column text-break  gap-2">
							<h1 className="text-xl ">
								Selected Seats : {selectedSeats.join(",")}
							</h1>
							<h1 className="text-xl ">
								Fare : {bus.fare * selectedSeats.length}
							</h1>
						</div>
						<hr />

						<Button disabled={selectedSeats.length === 0} onClick={bookNow}  >Book Now</Button>
						{/* <button
							className={`primary-btn ${selectedSeats.length === 0 && "disabled-btn"
								}`}
							disabled={selectedSeats.length === 0}
						>
							Book Now
						</button> */}
					</Col>
					<Col lg={12} sm={24} xs={24}>
						<SeatSelection
							selectedSeats={selectedSeats}
							bus={bus}
							setSelectedSeats={setSelectedSeats}

						/>
					</Col>
				</Row>)
			}
		</div>
	);
};

export default BookNow;