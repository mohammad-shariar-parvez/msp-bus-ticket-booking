import React from 'react';
import { useNavigate } from 'react-router-dom';

const Bus = ({ bus }) => {
	const navigate = useNavigate();
	console.log("MY ALL buss", bus);
	return (
		<div className='card '>
			<h1 className='text-lg'>{bus.name}</h1>
			<hr />
			<div className="d-flex justify-content-between gap-3">
				<div >
					<p className="text-sm">From </p>
					<p className="text-sm"> {bus.from}</p>
				</div>
				<div >
					<p className="text-sm">To </p>
					<p className="text-sm">{bus.to} </p>
				</div>
				<div >
					<p className="text-sm">Fare </p>
					<p className="text-sm">$ {bus.fare} </p>
				</div>

			</div>
			<div className="d-flex justify-content-between align-items-end ">
				<div>
					<p className="text-sm">Journey Date </p>
					<p className="text-sm">$ {bus.journeyDate} </p>
				</div>
				<h1 className='text-lg  underline' onClick={() => navigate(`/book-now/${bus._id}`)} >Book NOw</h1>
			</div>
		</div>
	);
};

export default Bus;