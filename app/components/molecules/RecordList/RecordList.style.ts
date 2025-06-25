import styled from 'styled-components';
import Text from '../../atoms/Text';

export const ListContainer = styled.div`
    margin-top: 20px;
    border-top: 1px solid #eee;
    padding-top: 15px;
`;

export const ListTitle = styled.h3`
    font-size: 18px;
    margin-bottom: 12px;
    color: #333;
`;

export const RecordItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #f0f0f0;

    &:nth-child(odd) {
        background-color: #f9f9f9;
    }
`;

export const RankText = styled(Text)`
    font-weight: bold;
    color: #6c63ff;
    margin-right: 10px;
`;

export const ValueText = styled(Text)`
    font-size: 16px;
    font-weight: 500;
`;

export const TimeText = styled(Text)`
    font-size: 12px;
    color: #888;
`;
