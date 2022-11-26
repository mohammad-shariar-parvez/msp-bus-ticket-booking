import React from 'react';

const DefaultLayout = ({ children }) => {
	return (
		<div>
			<h1>Admin Header</h1>
			{children}
		</div>
	);
};

export default DefaultLayout;