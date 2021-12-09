import styled from 'styled-components';

export const DropdownDiv = styled.div`
    position: absolute;
    top: 79px;
    right: 35px;
    width: 150px;
    background-color: #242526;
    border-radius: 8px;
    padding: 1rem;
    overflow: hidden;
`;

export const MenuItem = styled.a`
    height: 40px;
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

export const Icon = styled.span`
    margin-right: auto;
    padding: 0.5rem;
    transform: scale(1.2);
    color: #fff;

    &:empty {
        display: none;
    }
`;

export const Triangle = styled.div`
    width: 0; 
    height: 0; 
    position: absolute;
    top: 70px;
    right: 39px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
  
    border-bottom: 10px solid #242526;
`;