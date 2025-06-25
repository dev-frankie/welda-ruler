import React from 'react';
import Text from '../../atoms/Text';
import * as S from './RecordList.style';

interface Record {
    value: number;
    timestamp: string;
}

interface RecordListProps {
    records: Record[];
}

const RecordList: React.FC<RecordListProps> = ({ records }) => {
    if (records.length === 0) {
        return (
            <S.ListContainer>
                <S.ListTitle>측정 기록</S.ListTitle>
                <Text>아직 저장된 기록이 없습니다. 줄자로 측정 후 저장해보세요!</Text>
            </S.ListContainer>
        );
    }

    return (
        <S.ListContainer>
            <S.ListTitle>측정 기록 (큰 순서대로)</S.ListTitle>
            {records.map((record, index) => (
                <S.RecordItemContainer key={index}>
                    <div>
                        <S.RankText>{index + 1}.</S.RankText>
                        <S.ValueText>{record.value.toFixed(1)} cm</S.ValueText>
                    </div>
                    <S.TimeText>{record.timestamp}</S.TimeText>
                </S.RecordItemContainer>
            ))}
        </S.ListContainer>
    );
};

export default RecordList;
