import styled from 'styled-components';

export const DropdownDiv = styled.div`
    position: absolute;
    top: 58px;
    width: 300px;
    transform: translateX(-45%);
    background-color: #000;
    border-radius: 8px;
    padding: 1rem;
    overflow: hidden;
`;

export const MenuItem = styled.a`
    height: 50px;
    display: flex;
    background-color: #FAF9F6
    align-items: center;
    border-radius: 8px;
    transition: background 1s;
    padding: 0.5rem;

    &:hover {
        background-color: #525357;
    }
`;

export const IconRight = styled.span`
    margin-left: auto;
`;