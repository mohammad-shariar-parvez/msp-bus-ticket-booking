import { Form, Input, message } from 'antd';
import { Link, } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/buttons/Button';
import { Authentication } from '../components/forms/Authentication';
import { FormSection } from '../components/forms/FormSection';
import { useDispatch } from 'react-redux';
import { HideLoading, Showloading } from '../redux/alertsSlice';
import '../resources/auth.css';



const Login = () => {
	const dispatch = useDispatch();

	const onFinish = async (values) => {
		console.log('Success:', values);

		try {
			dispatch(Showloading());
			const response = await axios.post("http://localhost:5001/api/users/login", values);
			console.log("DATA<DATA", response.data.data);
			dispatch(HideLoading());
			if (response.data.success) {
				message.success(response.data.message);
				localStorage.setItem('token', response.data.data);
				// navigate('/');
				window.location.href = "/";
			}
			else {
				message.error(response.data.message);
			}
		} catch (error) {
			dispatch(HideLoading());
			message.error(error.message);
		}
	};

	return (
		<div >
			<Authentication >
				<FormSection login>
					<h1 className='text-md' > Login</h1>
					<hr />
					<Form layout='vertical'
						onFinish={onFinish}
						name="basic"
						autoComplete="off">
						<Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please input your email !' }]}>
							<Input />
						</Form.Item>
						<Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
							<Input.Password />
						</Form.Item>
						<div className='d-flex justify-content-between  align-items-center'>
							<Link to='/Register'>Register</Link>
							<Button login htmlType="submit" >Login</Button>
						</div>
					</Form>
				</FormSection>


			</Authentication >
		</div>

	);
};

export default Login;