import styled, { css } from 'styled-components';

import { darken } from 'polished';

import Tooltip from '../Tooltip';

interface ContainerProps {
    isFocused: boolean;
    isFiled: boolean;
    isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
    padding: 16px;
    width: 100%;
    height: 60px;
    background: ${darken(0.08, '#312E38')};
    border-radius: 10px;

    border: 2px solid ${darken(0.08, '#312E38')};
    color: #666360;

    display: flex;
    align-items: center;

    & + div {
        margin-top: 8px;
    }

    ${(props) =>
        props.isErrored &&
        css`
            border-color: #c53030;
        `}

    ${(props) =>
        props.isFocused &&
        css`
            color: #ff9000;
            border-color: #ff9000;
        `}


    ${(props) =>
        props.isFiled &&
        css`
            color: #ff9000;
        `}

    input {
        flex: 1;
        background: transparent;
        border: none;
        color: #f4ede8;

        & + input {
            margin-top: 10px;
        }

        > & {
            margin-bottom: 16px;
        }

        &::placeholder {
            color: #666360;
        }
    }

    svg {
        margin-right: 10px;
    }
`;

export const Error = styled(Tooltip)`
    height: 20px;
    margin-left: 10px;

    svg {
        margin: 0;
    }

    span {
        background: #c53030;
        color: #fff;

        &::before {
            border-color: #c53030 transparent;
        }
    }
`;
