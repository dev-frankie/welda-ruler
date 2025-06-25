import styled from 'styled-components';

/** 굵은 눈금(1 cm)에 표시되는 숫자 레이블 */
export const TickLabel = styled.span`
    position: absolute;
    top: 35px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    color: #666;
    pointer-events: none;
`;
