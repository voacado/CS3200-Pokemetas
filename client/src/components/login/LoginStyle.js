import styled from 'styled-components';

export const LoginDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 480px) {
        padding: 60px 0;
    }

    &.h1 {
        margin: 0 0 20px;
        line-height: 1;
        color: #44c4e7;
        font-size: 18px;
        font-weight: 400;
    }
`;

export const Form = styled.form`
    position: absolute;
    top: 50%;
    left: 50%;
    background: #fff;
    width: 285px;
    margin: -140px 0 0 -182px;
    padding: 40px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
`;

export const Body = styled.body`
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &:before {
        z-index: -1;
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        background: #44c4e7;
        background: rgba(0, 0, 0, 0);
        width: 100%;
        height: 100%;
    }
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