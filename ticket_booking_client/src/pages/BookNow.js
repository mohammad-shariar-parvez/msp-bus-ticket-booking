import React, { useEffect, useState } from 'react';
import { HideLoading, Showloading } from '../redux/alertsSlice';
import { Col, message, Row, Table } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Bus from '../components/buses/Bus';
import { axiosInstance } from '../helpers/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import SeatSelection from '../components/seatSelections/SeatSelection';
import { Button } from '../components/buttons/Button';
import StripeCheckout from 'react-stripe-checkout';


const BookNow = () => {
	const [selectedSeats, setSelectedSeats] = useState([]);
	const dispatch = useDispatch();
	const [bus, setBus] = useState(null);
	const params = useParams();
	const navigate = useNavigate();



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

	const bookNow = async (transactionId) => {
		try {
			dispatch(Showloading());
			const response = await axiosInstance.post("http://localhost:5001/api/bookings/book-seat", {
				bus: bus._id,
				seats: selectedSeats,
				transactionId
			});
			// bus.seatsBooked = response.data.seatsBooked;
			// console.log("Selected seats", response.data.seatsBooked);
			// getBus();

			dispatch(HideLoading());
			if (response.data.success) {
				message.success(response.data.message);
				navigate("/bookings");
			}
			else {
				message.error(response.data.message);
			}
		} catch (error) {
			dispatch(HideLoading());
			message.error(error.message);
		}
	};

	const onToken = async (token) => {
		// console.log("TOKEN IS ", token);
		try {
			dispatch(Showloading());
			const response = await axiosInstance.post('http://localhost:5001/api/bookings/make-payment', {
				token,
				amount: bus.fare * selectedSeats.length * 100
			});
			// console.log("RESPOMSE OF TOKEEEN", response);
			dispatch(HideLoading());
			if (response.data.success) {
				message.success(response.data.message);
				bookNow(response.data.data.transactionId);
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
				(<Row className='mt-3' gutter={[30, 30]}>
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
								Fare: ¥ {bus.fare * selectedSeats.length}
							</h1>
						</div>
						<hr />

						<StripeCheckout
							billingAddress
							token={onToken}
							currency="CNY"
							amount={bus.fare * selectedSeats.length * 100}
							stripeKey="pk_test_51JwmkHK0zRpRkYqiEreyEFMc9EoLDBExVpaDUxBaKnKJoI1xjZSUXK3pNjIPDsUvRMK5FuudjD2UShE9T1jilvRM00LvgIeFXT"
						>
							<Button disabled={selectedSeats.length === 0} >Book Now</Button>
						</StripeCheckout>
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