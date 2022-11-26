import React from 'react';
import { Space, Spin } from 'antd';
const Loader = () => {
	return (
		<div className="spinner-parent" >
			<Spin className="spinner-border1" size="large" />
		</div>
	);
};

export default Loader;