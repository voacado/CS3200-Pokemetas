import styled from 'styled-components';

export const ButtonDiv = styled.div`
    border-radius: 4px;
    background: #4470BD;
    padding: 10px 22px;
    color: #fff;
    outline: none;
    border: none;
    cursor: pointer;
    transition: filter 1s;
    text-decoration: none;
    margin-bottom: 20px;
  
    height: auto;
    width: auto;
  
    margin-left: 24px;
  
  
    &:hover {
        filter: brightness(1.3);
    }
`;

export const PopupDiv = styled.div`
    position: absolute;
    width: 25vw;
    height: 32vh;
    bottom: 35vh;
    right: 33vw;
    background-color: #242526;
    border-radius: 8px;
    padding: 2rem;
    overflow: hidden;
`;

export const IconDiv = styled.div`
    color: #fff;
    transition: all 0.2s ease-in-out;
    position: absolute;
    top: 5px;
    right: 10px;

    &:hover {
        transform: scale(1.3);
    }

`;

export const Title = styled.h2`
    color: #fff;
    font-size: 24px;
`;

