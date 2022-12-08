import { useState } from 'react';

const CONTACT_FORM_INIT_STATE = {
	name: '',
	email: '',
	group: '',
};

const AdminHome = () => {
	const [values, setValue] = useState({ ...CONTACT_FORM_INIT_STATE });
	const { name, email, group } = values;
	const handleForm = (e) => {

		setValue({ ...values, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		setValue({ ...CONTACT_FORM_INIT_STATE });
	};

	const handleChange = (e) => {

		setValue({ ...values, [e.target.name]: e.target.value });
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor='name'>Name: </label>
				<input
					type='string'
					id='name'
					value={name}
					name='name'
					onChange={handleForm}
				/>
			</div>

			<div>
				<label htmlFor='email'>Email: </label>
				<input
					type='string'
					id='email'
					value={email}
					name='email'
					onChange={handleForm}
				/>
			</div>
			<div>
				<label htmlFor='group'>Group:</label>
				<select onChange={handleChange}>
					<option value=''>Select Group</option>
					<option value='Home'>Home</option>
					<option value='Office'>Office</option>
				</select>
			</div>

			<input type='submit' value='Create a new Contact' />
		</form>
	);
};
export default AdminHome;
