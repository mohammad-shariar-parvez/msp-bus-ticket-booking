import { Checkbox, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/buttons/Button';
import { Authentication } from '../components/forms/Authentication';
import { FormSection } from '../components/forms/FormSection';



const Login = () => {
	const navigate = useNavigate();

	const onFinish = async (values) => {
		console.log('Success:', values);

		try {
			const response = await axios.post("http://localhost:5001/api/users/login", values);
			// console.log('My registration message', response);
			if (response.data.success) {
				message.success(response.data.message);
				localStorage.setItem('token', response.data.data);
				navigate('/');
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
			<FormSection login>
				<h1 className='text-md' > Login</h1>
				<Form layout='vertical'
					onFinish={onFinish}
					name="basic"
					autoComplete="off">
					<Form.Item label='Email' name='email'>
						<Input />
					</Form.Item>
					<Form.Item label='Password' name='password'>
						<Input.Password />
					</Form.Item>
					<div className='d-flex justify-content-between  align-items-center'>
						<Link to='/Register'>Register</Link>
						<Button login htmlType="submit" >Login</Button>
					</div>
				</Form>
			</FormSection>


		</Authentication >
	);
};

export default Login;