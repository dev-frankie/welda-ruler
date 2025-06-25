'use client';

import React from 'react';
import { format } from 'date-fns';
import * as S from './RecordItem.style';

export interface RecordItemProps {
    v: number;
    ts: number;
}

export function RecordItem({ v, ts }: RecordItemProps) {
    return (
        <S.Item>
            <S.Value>{v.toFixed(1)} cm</S.Value>
            <S.Timestamp>{format(new Date(ts), 'yyyy-MM-dd HH:mm:ss')}</S.Timestamp>
        </S.Item>
    );
}
