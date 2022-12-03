import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../resources/layout.css';

const DefaultLayout = ({ children }) => {
	const navigate = useNavigate();
	const [colapsed, setColapsed] = useState(false);
	const { user } = useSelector(state => state.users);

	const userMenu = [
		{
			name: "Home",
			icon: "ri-home-line",
			path: "/",
		},
		{
			name: "Bookings",
			icon: "ri-file-list-line",
			path: "/bookings",
		},
		{
			name: "Profile",
			icon: "ri-user-line",
			path: "/profile",
		},
		{
			name: "Logout",
			icon: "ri-logout-box-line",
			path: "/logout",
		},
	];

	const adminMenu = [
		{
			name: "Home",
			path: "/",
			icon: "ri-home-line",
		},
		{
			name: "Buses",
			path: "/admin/buses",
			icon: "ri-bus-line",
		},
		{
			name: "Users",
			path: "/admin/users",
			icon: "ri-user-line",
		},
		{
			name: "Bookings",
			path: "/admin/bookings",
			icon: "ri-file-list-line",
		},
		{
			name: "Logout",
			path: "/logout",
			icon: "ri-logout-box-line",
		},
	];
	const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;
	// const menuToBeRendered = adminMenu;
	let activeRoute = window.location.pathname;
	if (window.location.pathname.includes('book-now')) {
		activeRoute = "/";
	}

	return (
		<div className='layout-parent' >
			<div className='sidebar'>
				<div className='sidear-header' >
					{!colapsed && <h1 className='logo' >TicketBook</h1>}

					{!colapsed && <p className='role'>{user?.name}<br />Role: {user?.isAdmin ? 'Admin' : 'User'}</p>}
				</div>
				<div className='d-flex flex-column gap-2 menu'>
					{menuToBeRendered.map((item, index) => {
						return <div className={`${activeRoute === item.path && "active-menu-item"}  ${colapsed ? "menu-item-colapsed " : "menu-item"}`}>
							{!colapsed ? (< i className={item.icon}  ></i>) :
								< i className={item.icon} onClick={() => {
									if (item.path == '/logout') {
										navigate('/login');
										localStorage.removeItem('token');
									}
									else {
										navigate(item.path);
									}
								}} ></i>}
							{!colapsed && (
								<span onClick={() => {
									if (item.path == '/logout') {
										navigate('/login');
										localStorage.removeItem('token');
									}
									else {
										navigate(item.path);
									}
								}} >{item.name}</span>)}
						</div>;
					})}
				</div>
			</div>
			<div className='body'>
				<div className='header' >
					{!colapsed ? (<i
						class="ri-close-line"
						onClick={() => setColapsed(!colapsed)}
					></i>
					) : (<i class="ri-menu-2-fill" onClick={() => setColapsed(!colapsed)}></i>)
					}
				</div>
				<div className='content' >{children}</div>
			</div>
		</div>
	);
};

export default DefaultLayout;