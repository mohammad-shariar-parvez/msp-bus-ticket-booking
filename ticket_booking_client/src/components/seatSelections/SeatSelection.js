import { Col, Row } from 'antd';
import React from 'react';
import '../../resources/bus.css';

const SeatSelection = ({ selectedSeats, setSelectedSeats, bus }) => {
	const capacity = bus.capacity;
	console.log("CAPAACITY", bus.capacity);

	const selectOrUnselectSeats = (seatNumber) => {

		if (selectedSeats.includes(seatNumber)) {
			setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
		} else {
			setSelectedSeats([...selectedSeats, seatNumber]);
		}
	};

	return (
		<div>

			<div className="bus-container">
				<Row gutter={[10, 10]}>

					{Array.from(Array(capacity).keys()).map((seat, index) => {
						let seatClass = '';
						if (selectedSeats.includes(seat + 1)) {
							seatClass = 'selected-seat';
						}
						return (<Col key={index} span={6} >
							<div className={`seat ${seatClass}`} onClick={() => selectOrUnselectSeats(seat + 1)} >
								{seat + 1}
							</div>
						</Col>);
					})}
				</Row>
			</div>
		</div>
	);
};

export default SeatSelection;