import styled from 'styled-components';

export const LoginDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 480px) {
        padding: 60px 0;
    }
`;

export const H1 = styled.h1`
    margin: 0 0 20px;   
    font-size: 24px;
`;

export const P = styled.p`   
    font-size: 12px;
    align: left;
`;

export const Form = styled.form`
    position: flex;
    top: 50%;
    left: 50%;
    background: #fff;
    width: 285px;
    margin: 100px 0 0 0;
    padding: 40px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
`;

export const Input = styled.input`
    outline: none;
    display: block;
    width: 100%;
    margin: 0 0 20px;
    padding: 10px 15px;
    border: 1px solid #ccc;
    color: #ccc;
    box-sizing: border-box;
    font-size: 14px;
    font-wieght: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: 0.2s linear;

    &:focus {
        color: #333;
        border: 1px solid #44c4e7;
    }
`;

export const Button = styled.button`
    cursor: pointer;
    background: #44c4e7;
    width: 100%;
    padding: 10px 15px;
    border: 0;
    color: #fff;
    font-size: 14px;
    font-weight: 400;

    &:hover {
        background: #369cb8;
    }
`;