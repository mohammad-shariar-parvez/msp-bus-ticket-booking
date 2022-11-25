import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SetUser } from '../../redux/usersSlice';


const ProtectedRoute = ({ children }) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	console.log("RUN IN  EVERY TIME", loading);
	const validateToken = async () => {
		try {
			const response = await axios.post("http://localhost:5001/api/users/get-user-by-id", {}, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			});

			if (response.data.success) {
				setLoading(false);
				dispatch(SetUser(response.data.data));

			}
			//have token but  userId meiyou	
			//NOOOO NEEED 
			else {
				console.log("came to part111111");
				localStorage.removeItem('token');
				setLoading(false);
				navigate('/login');
				message.error(response.data.message);
			}
		} catch (error) {
			localStorage.removeItem('token');
			console.log("came to part2222", error.message);
			setLoading(false);
			navigate('/login');
			message.error(error.message);



		}
	};

	useEffect(() => {
		if (localStorage.getItem('token')) {
			validateToken();
		}
		else {
			navigate("/login");
		}
		console.log("RUN FROM USEEFFECT", loading);
	}, []);

	return (
		<div>
			{
				loading ? <div>Loading</div> : <div>{children}</div>
			}
		</div>
	);
};

export default ProtectedRoute;