import styled from "styled-components";

export const Button = styled.button`
	background-color:${props => (props.login && `var(--primary)`) ||
		(props.register && `var(--secondary)`) || (props.addBuss && '#D23F57') || (props.disabled && 'gray') || (props.print && 'blue') || '#D23F57'} ;
	color: white;
	border-radius: 5px;
	padding: 10px 20px;
	margin:10px ;
	cursor: pointer;
	border:none ;
	cursor: disabled && not-allowed;
`;