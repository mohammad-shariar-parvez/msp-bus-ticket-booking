import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Bus = ({ bus }) => {
	const navigate = useNavigate();
	const { user } = useSelector(state => state.users);
	console.log("USER IN BUS", user);
	return (
		<div className='card '>
			<h1 className='text-lg text-primary'>{bus.name}</h1>
			<hr />
			<div className="d-flex justify-content-between gap-3">
				<div >
					<span className="text-sm">From </span>
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
			<hr />
			<div className="d-flex justify-content-between align-items-end ">
				<div>
					<p className="text-sm">Journey Date </p>
					<p className="text-sm">$ {bus.journeyDate} </p>
				</div>

				<div>

					{
						user.isBlocked ? <h1 className='text-lg  '  >Blocked</h1>
							:
							<h1 className='text-lg  underline text-secondary' onClick={() => navigate(`/book-now/${bus._id}`)} >Book Now</h1>
					}
				</div>
			</div>
		</div>
	);
};

export default Bus;