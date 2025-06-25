import styled from 'styled-components';
import { Button as AtomButton } from '../../atoms/Button';

export const StyledSave = styled(AtomButton)`
    background-color: #6c63ff;
    font-size: 1.125rem;
    padding: 0.75rem;

    transition: background-color 0.2s ease;

    &:hover:not(:disabled) {
        background-color: #574bdb;
    }
    &:active:not(:disabled) {
        background-color: #4539b8;
    }
`;
