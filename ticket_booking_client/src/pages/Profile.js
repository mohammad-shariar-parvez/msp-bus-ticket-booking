import { Col, Row } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const Profile = () => {
	const dispatch = useDispatch();
	// const { loading } = useSelector(state => state.alerts);
	const { user } = useSelector(state => state.users);

	return (
		<div className='profile-container ' >
			<Row>
				<Col sm={24} xs={24}>
					<div className="d-flex flex-column gap-2 align-items-start justify-content-center">
						<p className='text-2xl' ><span>Name:</span> {user.name}</p>
						<p className='text-xl' ><span>Email:</span> {user.email}</p>
						{user.isAdmin ? <p className='text-xl' ><span>Role:</span> Admin</p> : <p className='text-xl' ><span>Role:</span> User</p>}

						{user.isBlocked ? <p className='text-xl' ><span>Status:</span> Active</p> : <p className='text-xl' ><span>Status:</span> Blocked</p>}

						<p className='text-xl'><span>Created on:</span>  {moment(user.createdAt).format('DD/MM/YYYY')
						}</p>



					</div>
				</Col>
			</Row>
		</div>
	);
};

export default Profile;