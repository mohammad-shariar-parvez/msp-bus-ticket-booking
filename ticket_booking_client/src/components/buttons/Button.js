import styled from "styled-components";

export const Button = styled.button`
	background-color:${props => (props.login && `var(--primary)`) ||
		(props.register && `var(--secondary)`) ||
		(props.addBuss && '#D23F57') ||
		(props.disabled && 'gray') ||
		(props.print && 'blue') ||
		(props.cancle && 'orrange') ||
		(props.reset && 'gray') ||
		(props.search && 'skyBlue') || '#D23F57'} ;
	color: white;
	border-radius: ${props => (props.search && '0') || '5px'} ;

	padding: ${props => (props.search && '7px 20px') || '10px 20px'} ;
	margin:${props => (props.search && '0px') || '10px'} ;

	cursor: pointer;
	border:none ;
	cursor: disabled && not-allowed;
`;