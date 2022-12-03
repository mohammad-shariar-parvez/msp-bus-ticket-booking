import styled from 'styled-components';
import img from './image/AdobeStock_256753384_Preview.jpeg';

export const Authentication = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	/* background: url('../../../public/images/AdobeStock_243460462_Preview.jpeg'); */
	background-image:linear-gradient(rgba(80, 84, 100, 0.7), rgba(50, 56, 84, 0.7)),  url(${img});
	 background-position: center;
 	background-repeat: no-repeat;
 	background-size: cover; 
	position: relative;
	overflow: hidden;
`;
