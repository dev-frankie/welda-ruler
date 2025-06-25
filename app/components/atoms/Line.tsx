import styled from 'styled-components';

const Line = styled.div<{ height: number; color?: string }>`
    width: 1px;
    height: ${({ height }) => height}px;
    background-color: ${({ color }) => color || '#ccc'};
`;

export default Line;
