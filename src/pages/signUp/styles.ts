import styled from 'styled-components';

import { darken } from 'polished';

const signupBackground = require('../../assets/sign-up.png');

export const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content: stretch;
`;

export const Content = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 700px;

    place-content: center;

    form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
            margin-bottom: 24px;
        }
    }

> a {
    text-decoration: none;
    color: #f4ede8;
    display: block;
    margin-top: 24px;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
        margin-right: 16px;
    }

    &:hover {
        color: ${darken(0.1, '#f4ede8')}
    }
`;

export const Background = styled.div`
    flex: 1;
    background: url(${signupBackground}) no-repeat center;
    background-size: cover;
`;
