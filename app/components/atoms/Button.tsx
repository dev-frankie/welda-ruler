import styled from 'styled-components';

export const Button = styled.button`
    width: 100%;
    padding: 0.9rem 1rem;
    border: none;
    border-radius: 0.75rem;
    font-weight: 600;
    background: #5f5af6;
    color: #ffffff;
    font-size: 1rem;
    text-align: center;

    &:disabled {
        opacity: 0.45;
        cursor: default;
    }

    cursor: pointer;
`;
