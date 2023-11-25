/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../../redux/usersSlice';
import { HideLoading, Showloading } from '../../redux/alertsSlice';
import DefaultLayout from '../defaultLayouts/DefaultLayout';


const ProtectedRoute = ({ children }) => {
	const dispatch = useDispatch();
	// const { loading } = useSelector(state => state.alerts);
	const { user } = useSelector(state => state.users);


	// const [loading, setLoading] = useState(true);
	const navigate = useNavigate();


	const validateToken = async () => {
		try {

			dispatch(Showloading());
			const response = await axios.post("http://localhost:5001/api/users/get-user-by-id", {}, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			});

			dispatch(HideLoading());
			if (response.data.success) {
				// setLoading(false);
				dispatch(SetUser(response.data.data));

			}
			//have token but  userId meiyou	
			//NOOOO NEEED 
			else {

				localStorage.removeItem('token');
				navigate('/login');
				message.error(response.data.message);
			}
		} catch (error) {
			dispatch(HideLoading());
			localStorage.removeItem('token');
			message.error(error.message);
			navigate('/login');



		}
	};

	useEffect(() => {

		if (localStorage.getItem('token')) {
			validateToken();
		}
		else {
			navigate("/login");
		}
	}, []);

	useEffect(() => {
		if (window.location.pathname.includes("admin")) {
			if (!user?.isAdmin) {
				// window.location.href = "/"
				message.error("You are not authorized to access this page");
				navigate('/');
			}
		}
	}, [user]);


	return (
		<div>
			{
				user && <div><DefaultLayout>{children}</DefaultLayout></div>
			}
		</div>
	);
};

export default ProtectedRoute;