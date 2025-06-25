import styled from 'styled-components';
import Text from '../../atoms/Text';

export const Form = styled.form`
    max-width: 400px;
    margin: 4rem auto;
    padding: 20px;
    display: grid;
    gap: 1.25rem;
`;

export const Field = styled.label`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

export const LabelText = styled.span`
    font-weight: 500;
`;

export const ErrorText = styled(Text)`
    min-height: 18px;
    font-size: 14px;
    color: #e74a3b;
    line-height: 1;
`;
