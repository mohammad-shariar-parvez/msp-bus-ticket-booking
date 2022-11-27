import React, { useState } from 'react';
import BusForm from '../../components/busForms/BusForm';
import { Button } from '../../components/buttons/Button';
import PageTitle from '../../components/pageTitles/PageTitle';

const AdminBuses = () => {
	const [showBusForm, setShowBusForm] = useState(false);
	// console.log(showBusForm);
	return (
		<div className='d-flex justify-content-between'>
			<PageTitle title='Buses' />
			<Button addBuss onClick={() => setShowBusForm(true)} >Add Bus</Button>

			{showBusForm && <BusForm showBusForm={showBusForm} setShowBusForm={setShowBusForm} />}
		</div>
	);
};

export default AdminBuses;