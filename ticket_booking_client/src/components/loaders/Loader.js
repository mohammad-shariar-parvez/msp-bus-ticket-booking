import React from 'react';
import { Space, Spin } from 'antd';
const Loader = () => {
	return (
		<Space size="middle">

			<Spin size="large" />
		</Space>
	);
};

export default Loader;