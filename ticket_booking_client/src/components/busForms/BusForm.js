import React from 'react';
import { Col, DatePicker, Form, Input, InputNumber, message, Modal, Row, Select, } from 'antd';
import { Button } from '../buttons/Button';
import { axiosInstance } from '../../helpers/axiosInstance';
import { useDispatch } from 'react-redux';
import { HideLoading, Showloading } from '../../redux/alertsSlice';
const { Option } = Select;


const BusForm = ({ showBusForm, setShowBusForm, type = 'add', getData, selectedBus, setSelectedBus }) => {

	const dispatch = useDispatch();
	const handleCancel = () => {
		setSelectedBus(null);
		setShowBusForm(false);
	};



	const onFinish = async (values) => {


		try {
			dispatch(Showloading());
			let response = null;
			if (type === 'add') {
				response = await axiosInstance.post("http://localhost:5001/api/buses/add-bus", values);
			}
			else {

				response = await axiosInstance.patch("http://localhost:5001/api/buses/update-bus", { ...values, _id: selectedBus._id });

			}
			if (response.data.success) {
				message.success(response.data.message);
			}
			else {
				message.error(response.data.message);
			}
			getData();
			setShowBusForm(false);
			setSelectedBus(null);
			dispatch(HideLoading());
		} catch (error) {
			message.error(error.message);
			dispatch(HideLoading());
		}
	};

	const onReset = () => {
		setSelectedBus(null);
		// form.resetFields();
	};

	return (
		<Modal width={800}
			title={type == "add" ? "Add Bus" : "Update Bus"}
			open={showBusForm}
			onCancel={handleCancel}

			footer={false}>
			<Form layout='vertical' onFinish={onFinish} initialValues={selectedBus} >
				<Row gutter={[10, 10]}>
					<Col lg={24} sx={24}>
						<Form.Item label='Bus Name' name="name" rules={[{ required: true, message: 'Bus Name is required !' }]}>
							<Input />
						</Form.Item>
					</Col>
					<Col lg={12} sx={24}>
						<Form.Item label='Bus Number' name="number" rules={[{ required: true, message: 'Bus Number is required !' }]}>

							<Input />
							{/* <input type="number" /> */}
						</Form.Item>
					</Col>
					<Col lg={12} sx={24}>
						<Form.Item label='Capacity' name="capacity" rules={[{ required: true, message: 'Capacity is required !' }]}>
							<InputNumber type='number' />
						</Form.Item>
					</Col>
					<Col lg={12} sx={24}>
						<Form.Item label='From' name="from" rules={[{ required: true, message: 'From is required !' }]}>
							<Input />
						</Form.Item>
					</Col>
					<Col lg={12} sx={24}>
						<Form.Item label='To' name="to" rules={[{ required: true, message: 'To is required !' }]}>
							<Input />
						</Form.Item>
					</Col>

					<Col lg={8} sx={24}>
						<Form.Item label='Journey Date' name="journeyDate" rules={[{ required: true, message: 'Journey Date is required !' }]}>
							<Input type='date' />

							{/* <DatePicker /> */}
						</Form.Item>
					</Col>
					<Col lg={8} sx={24}>
						<Form.Item label='Departure' name="departure" rules={[{ required: true, message: 'Departure is required !' }]}>
							<Input type='time' />
						</Form.Item>
					</Col>

					<Col lg={8} sx={24}>
						<Form.Item label='Arrival' name="arrival" rules={[{ required: true, message: 'Arrival is required !' }]}>
							<Input type='time' />
						</Form.Item>
					</Col>


					<Col lg={12} sx={24}>
						<Form.Item label='Type' name="type" rules={[{ required: true, message: 'Type is required !' }]}>
							<Select name='' id='' >
								<Option value="AC">AC</Option>
								<Option value="Non-AC">Non-AC</Option>
							</Select>
						</Form.Item>

					</Col>
					<Col lg={12} sx={24}>
						<Form.Item label='Fare' name="fare" rules={[{ required: true, message: 'Fare is required !' }]}>
							<InputNumber />
						</Form.Item>
					</Col>
					<Col lg={12} sx={24}>
						<Form.Item label='Status' name="status" rules={[{ required: true, message: 'Status is required !' }]}>
							<Select name='' id=''>
								<Option value="Yet To Start">Yet To Start</Option>
								<Option value="Running">Running</Option>
								<Option value="Completed">Completed</Option>
							</Select>
						</Form.Item>
					</Col>

				</Row>
				<div className="d-flex justify-content-end ">
					<Button type='submit'>Save</Button>
					<Button type='reset' onClick={onReset}>Reset</Button>
					<Button type='reset' onClick={handleCancel}>Cancle</Button>
				</div>
			</Form>

		</Modal>
	);
};

export default BusForm;