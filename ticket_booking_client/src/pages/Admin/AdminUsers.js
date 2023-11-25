import React, { useEffect, useState } from 'react';
import { message, Table } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import BusForm from '../../components/busForms/BusForm';
import { Button } from '../../components/buttons/Button';
import PageTitle from '../../components/pageTitles/PageTitle';
import { axiosInstance } from '../../helpers/axiosInstance';
import { HideLoading, Showloading } from '../../redux/alertsSlice';

const AdminUsers = () => {

	const dispatch = useDispatch();
	const [users, setUsers] = useState([]);


	const getUsers = async () => {
		try {
			dispatch(Showloading());
			const response = await axiosInstance.post('http://localhost:5001/api/users/get-all-users', {});
			dispatch(HideLoading());
			//we can add store
			if (response.data.success) {
				setUsers(response.data.data);
			}
			else {
				message.error(response.data.message);
			}
		} catch (error) {
			dispatch(HideLoading());
			message.error(error.message);
		}
	};

	const updateUserPermission = async (user, action) => {

		let payload = null;
		if (action === 'make-admin') {
			payload = {
				...user,
				isAdmin: true
			};
		}
		else if (action === 'remove-admin') {
			payload = {
				...user,
				isAdmin: false
			};
		}
		else if (action === 'block') {
			payload = {
				...user,
				isBlocked: true
			};
		}
		else if (action === 'unblock') {
			payload = {
				...user,
				isBlocked: false
			};
		}


		try {
			dispatch(Showloading());
			const response = await axiosInstance.post('http://localhost:5001/api/users/update-user-permissions', payload);
			dispatch(HideLoading());

			//we can add store
			if (response.data.success) {
				message.success("User Updated Successfully");
				getUsers();
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
			title: "Name",
			dataIndex: "name",
		},
		{
			title: "Email",
			dataIndex: "email",
		},
		{
			title: "Status",
			dataIndex: "",
			render: (data) => {

				return data.isBlocked ? "Blocked" : "Active";
			}
		},
		{
			title: "Role",
			dataIndex: "isAdmin",
			render: (data) => {
				return data ? "Admin" : "User";
			}
		},

		{
			title: "Action",
			dataIndex: "action",
			render: (action, record) => (

				<div className="d-flex gap-3">
					{record?.isBlocked ? <p className='underline' onClick={() => updateUserPermission(record, 'unblock')}>Unblock</p> :

						<p className='underline' onClick={() => updateUserPermission(record, 'block')} >Block</p>}


					{record?.isAdmin ? <p className='underline' onClick={() => updateUserPermission(record, 'remove-admin')} >Remove Admin  </p> : <p className='underline' onClick={() => updateUserPermission(record, 'make-admin')} >Make Admin</p>}


				</div>
			)
		},
	];
	// 2 ways to send record id , here we cant but for delete we can
	useEffect(() => {
		getUsers();
	}, []);

	return (
		<div>
			<div className='d-flex justify-content-between my-2'>
				<PageTitle title='Users' />
			</div>
			<Table dataSource={users} columns={columns} />

		</div>
	);
};

export default AdminUsers;