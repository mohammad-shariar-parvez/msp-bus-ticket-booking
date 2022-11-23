import { Checkbox, Form, Input, message } from 'antd';
import { Button } from '../components/buttons/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Authentication } from '../components/forms/Authentication';
import { FormSection } from '../components/forms/FormSection';
const Register = () => {



	const onFinish = async (values) => {
		// console.log('Success:', values);

		try {
			const response = await axios.post("http://localhost:5001/api/users/register", values);
			console.log('My registration message', response);
			if (response.data.success) {
				message.success(response.data.message);
			}
			else {
				message.error(response.data.message);
			}
		} catch (error) {
			message.error(error.message);
		}
	};

	return (
		<Authentication >
			<FormSection register>
				<h1 className='text-md' >Register</h1>
				<Form layout='vertical'
					onFinish={onFinish}
					name="basic" autoComplete="off">
					<Form.Item label='Name' name='name' onFinish={onFinish}>
						<Input />
					</Form.Item>
					<Form.Item
						label='Email'
						name='email'
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						autoComplete="new-password"
						label='Password'
						name='password'
						rules={[{ required: true, message: 'Please input your password!' }]}


					>
						<Input type='password' autoComplete="new-password" />
					</Form.Item>
					<div className='d-flex justify-content-between align-items-center'>
						<Link to='/login'>Login</Link>
						<Button register htmlType="submit" >Register</Button>
					</div>
				</Form>
			</FormSection>


		</Authentication>
	);
};

export default Register;