import styled from 'styled-components';

export const FormSection = styled.div`
	width: ${props => (props.login && '400px') || (props.register && '300px')};
  
	padding: 19px;
	border: 2px solid gray;
	box-shadow: 0 0 2px gray;
	border-radius: 15px;
	background-color: white;
`;