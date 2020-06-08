import styled from 'styled-components';

import { darken } from 'polished';

export const Container = styled.button`
    padding: 0 15px;
    width: 100%;
    height: 60px;
    background: #ff9000;
    font-weight: 500;
    border: none;
    border-radius: 12px;
    transition: background-color 0.2s;
    margin-top: 16px;
    color: #312e38;

        &:hover {
        background: ${darken(0.08, '#ff9000')};
    }
`;
