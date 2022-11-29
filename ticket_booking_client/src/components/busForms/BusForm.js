import React from 'react';
import { Col, DatePicker, Form, Input, InputNumber, message, Modal, Row, } from 'antd';
import { Button } from '../buttons/Button';
import { axiosInstance } from '../../helpers/axiosInstance';
import { useDispatch } from 'react-redux';
import { HideLoading, Showloading } from '../../redux/alertsSlice';

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

				response = await axiosInstance.post("http://localhost:5001/api/buses/update-bus", { ...values, _id: selectedBus._id });
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

	return (
		<Modal width={800}
			title={type == "add" ? "Add Bus" : "Update Bus"}
			open={showBusForm}
			onCancel={handleCancel}
			footer={false}>
			<Form layout='vertical' onFinish={onFinish} initialValues={selectedBus} >
				<Row gutter={[10, 10]}>
					<Col lg={24} sx={24}>
						<Form.Item label='Bus Name' name="name">
							<Input />
						</Form.Item>
					</Col>
					<Col lg={12} sx={24}>
						<Form.Item label='Bus Number' name="number">

							<Input />
							{/* <input type="number" /> */}
						</Form.Item>
					</Col>
					<Col lg={12} sx={24}>
						<Form.Item label='Capacity' name="capacity">
							<InputNumber type='number' />
						</Form.Item>
					</Col>
					<Col lg={12} sx={24}>
						<Form.Item label='From' name="from">
							<Input />
						</Form.Item>
					</Col>
					<Col lg={12} sx={24}>
						<Form.Item label='To' name="to">
							<Input />
						</Form.Item>
					</Col>

					<Col lg={8} sx={24}>
						<Form.Item label='Journey Date' name="journeyDate">
							<Input type='date' />

							{/* <DatePicker /> */}
						</Form.Item>
					</Col>
					<Col lg={8} sx={24}>
						<Form.Item label='Departure' name="departure">
							<Input />
						</Form.Item>
					</Col>
					<Col lg={8} sx={24}>
						<Form.Item label='Arrival' name="arrival">
							<Input />
						</Form.Item>
					</Col>


					<Col lg={12} sx={24}>
						<Form.Item label='Type' name="type">
							<Input />

						</Form.Item>
					</Col>
					<Col lg={12} sx={24}>
						<Form.Item label='Fare' name="fare">
							<InputNumber />
						</Form.Item>
					</Col>
					<div className="d-flex justify-content-end ">
						<Button type='submit'>Save</Button>
					</div>
				</Row>
			</Form>
		</Modal>
	);
};

export default BusForm;