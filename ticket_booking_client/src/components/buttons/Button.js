import styled from "styled-components";

export const Button = styled.button`
	background-color:${props => (props.login && `var(--primary)`) ||
		(props.register && `var(--secondary)`) ||
		(props.addBuss && '#D23F57') ||
		(props.disabled && 'gray') ||
		(props.print && 'blue') ||
		(props.cancle && 'orrange') ||
		(props.reset && 'gray') ||
		(props.clear && 'transparent') ||
		(props.search && 'skyBlue') || '#D23F57'} ;
	color:  ${props => (props.clear && ' #D23F57' || 'white')};
	border-radius: ${props => ((props.search || props.clear) && '0') || '5px'} ;

	padding: ${props => ((props.search || props.clear) && '7px 20px') || '10px 20px'} ;
	margin:${props => ((props.search || props.clear) && '0px') || '10px'} ;


	border: ${props => (props.clear && ' 2px solid #D23F57' || 'none')};
	${props => (props.disabled && 'not-allowed' || ' pointer ')};
	
`;