import styled from 'styled-components';

export const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 80px;
    overflow: hidden;
    user-select: none;
`;

export const Pointer = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    /* 선의 중앙(0.5px)에 맞추기 위해 0.5px 보정 */
    transform: translateX(-50%); /* 포인터 CSS 미세 보정 재도입 */
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 15px solid #6c63ff;
    z-index: 10;
`;

/*  will-change 로 GPU 가속, transition 은 포인터 뗐을 때만 넣음 */
export const Scale = styled.div`
    display: flex;
    height: 80px;
    will-change: transform;
    cursor: pointer;
`;
