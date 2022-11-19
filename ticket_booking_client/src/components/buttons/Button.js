import styled from "styled-components";

export const Button = styled.button`
	background-color:${props => (props.login && `var(--primary)`) ||
		(props.register && `var(--secondary)`)} ;
	color: white;
	border-radius: 5px;
	padding: 10px 20px;
	cursor: pointer;
`;