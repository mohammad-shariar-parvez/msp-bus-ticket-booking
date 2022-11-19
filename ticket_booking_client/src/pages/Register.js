import { Checkbox, Form, Input } from 'antd';
import { Button } from '../components/buttons/Button';
import { Link } from 'react-router-dom';
import { Authentication } from '../components/forms/Authentication';
import { FormSection } from '../components/forms/FormSection';
const Register = () => {

	const onFinish = (values) => {
		console.log('Success:', values);
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