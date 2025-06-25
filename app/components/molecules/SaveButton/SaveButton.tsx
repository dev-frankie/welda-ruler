'use client';

import React from 'react';
import * as S from './SaveButton.style';

interface SaveButtonProps {
    onClick: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ onClick, disabled = false, children = '저장' }) => (
    <S.StyledSave onClick={onClick} disabled={disabled}>
        {children}
    </S.StyledSave>
);
