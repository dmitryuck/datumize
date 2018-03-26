import styled from 'styled-components';

interface TabNavElementProps {
    active: boolean;
}

export const TabsContainer = styled.div`

`;

export const TabNavigation = styled.ul`
    list-style: none;
    display: inline-block;
    min-width: 140px;
    margin: 0px;
    padding: 0px;
`;

export const TabNavElement = styled.li`
    min-width: 240px;
    height: 30px;
    background-color: ${(props: TabNavElementProps) => props.active ? '#CCCCBD' : 'white'};
    text-align: center;
    border: 1px solid #CCC;
    margin-bottom: 4px;
    cursor: pointer;
    line-height: 30px;
`;

export const TabContentContainer = styled.div`
    display: inline-block;
    background-color: white;
    min-width: 400px;
    margin-left: 20px;
`;

export const TabContent = styled.div`

`;
