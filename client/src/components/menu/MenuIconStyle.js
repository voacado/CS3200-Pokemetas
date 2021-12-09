import styled from 'styled-components';

export const MenuDiv = styled.div`
    width: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
`;

export const Li = styled.li`
    display: flex;
`;

export const IconDiv = styled.div`
    width: 30px;
    height: 30px;
    color: #fff;
    background-color: #242526;
    border-radius: 50%;
    padding: 5px;
    margin: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: filter 1s;
    transform: scale(1.3);

    &:hover {
        filter: brightness(2.0);
    }
`;