import styled from 'styled-components';
import { STEP_PX, POINTER_ALIGN_OFFSET } from '@/app/config/ruler';

export const Tick = styled.div.withConfig({
    shouldForwardProp: (p) => !['$major', '$first'].includes(p),
})<{
    $major: boolean;
    $first?: boolean;
}>`
    width: ${STEP_PX}px;
    height: ${({ $major }) => ($major ? 30 : 15)}px;
    position: relative;
    margin-left: ${({ $first }) => ($first ? POINTER_ALIGN_OFFSET : 0)}px;

    &::after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 1px;
        background: ${({ $major }) => ($major ? '#333' : '#ccc')};
    }
`;
