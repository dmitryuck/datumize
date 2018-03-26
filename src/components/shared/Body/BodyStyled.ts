import styled from 'styled-components';

interface ButtonProps {
    color: string;
}

export const BodyWrap = styled.div`
    width: 960px;
    margin: 0 auto;
`;

export const Button = styled.button`
    background-color: ${(props) => props.color ? props.color : '#CCC'};
    border: none;
    color: white;
`;
