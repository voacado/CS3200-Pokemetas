import styled from 'styled-components';

export const MenuDiv = styled.div`
    width: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 4;
`;

export const Li = styled.li`
    display: flex;
`;

export const IconDiv = styled.div`
    width: 30px;
    height: 30px;
    background-color: #FAF9F6;
    border-radius: 50%;
    padding: 5px;
    margin: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 1s;
    will-change: scale;

    &:hover {
        transform: scale(1.1);
    }
`;