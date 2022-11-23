import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (localStorage.getItem('token')) {
			navigate('/');
		}
		setLoading(false);

	}, []);
	return (
		<div>
			{loading ? <div><h3>Loading</h3></div> : children}
		</div>
	);
};

export default PublicRoute;