'use client';

import React, { useState } from 'react';
import Ruler from '../../organisms/Ruler/Ruler';
import RecordList from '../../molecules/RecordList/RecordList';
import { useSearchParams } from 'next/navigation';
import { kstTimestamp, toTime } from '@/app/utils/date';
import * as S from './RulerTemplate.style';
import { SaveButton } from '../../molecules/SaveButton/SaveButton';
import { Record } from '@/types/type';

export default function RulerTemplate() {
    const searchParams = useSearchParams();

    const min = parseFloat(searchParams.get('min') ?? '80');
    const max = parseFloat(searchParams.get('max') ?? '120');
    const defaultValue = parseFloat(searchParams.get('default') ?? '80');

    const [currentValue, setCurrentValue] = useState(defaultValue);
    const [records, setRecords] = useState<Record[]>([]);

    const handleSaveRecord = () => {
        const timestamp = kstTimestamp();
        const sorted = [...records, { value: currentValue, timestamp }]
            .sort((a, b) => {
                if (b.value !== a.value) return b.value - a.value;
                return toTime(b.timestamp) - toTime(a.timestamp);
            })
            .slice(0, 5);
        setRecords(sorted);
    };

    return (
        <S.Container>
            <S.CurrentValueDisplay>{currentValue.toFixed(1)} cm</S.CurrentValueDisplay>
            <Ruler min={min} max={max} value={currentValue} onChange={setCurrentValue} />
            <SaveButton onClick={handleSaveRecord}>저장</SaveButton>
            <RecordList records={records} />
        </S.Container>
    );
}
