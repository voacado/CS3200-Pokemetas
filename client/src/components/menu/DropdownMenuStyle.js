import styled from 'styled-components';

export const DropdownDiv = styled.div`
    position: absolute;
    top: 70px;
    width: 300px;
    transform: translateX(-85%);
    background-color: #242526;
    border-radius: 8px;
    padding: 1rem;
    overflow: hidden;
`;

export const MenuItem = styled.a`
    height: 50px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    transition: background 1s;
    padding: 0.5rem;
    text-decoration: none;
    color: #dadce1;

    &:hover {
        background-color: #525357;
    }
`;