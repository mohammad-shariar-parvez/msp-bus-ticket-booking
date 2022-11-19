import { Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { Button } from '../components/buttons/Button';
import { Authentication } from '../components/forms/Authentication';
import { FormSection } from '../components/forms/FormSection';
const Login = () => {

	const onFinish = (values) => {
		console.log('Success:', values);
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