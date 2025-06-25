'use client';

import React from 'react';
import * as S from './SettingTemplate.style';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { useSettingsForm } from '@/app/hooks/useSettingForm';

export function SettingsTemplate() {
    const { form, onSubmit } = useSettingsForm();
    const {
        register,
        formState: { errors, isValid },
    } = form;

    return (
        <S.Form onSubmit={onSubmit} noValidate>
            <S.Field>
                <S.LabelText>최소값</S.LabelText>
                <Input
                    type="number"
                    {...register('min', {
                        required: '최소값은 필수입니다.',
                        valueAsNumber: true,
                        validate: (v) => {
                            if (Number.isNaN(v)) return true;

                            const m = form.getValues('max');
                            if (v < 0) return '최소값은 0 이상이어야 합니다.';
                            return Number.isNaN(m) || v < m || '최소값은 최대값보다 작아야 합니다.';
                        },
                    })}
                />
                <S.ErrorText>{errors.min?.message}</S.ErrorText>
            </S.Field>

            <S.Field>
                <S.LabelText>최대값</S.LabelText>
                <Input
                    type="number"
                    {...register('max', {
                        required: '최대값은 필수입니다.',
                        valueAsNumber: true,
                        validate: (v) => {
                            if (Number.isNaN(v)) return true;
                            if (v > 999) return '최대값은 999 이하이어야 합니다.';
                            const m = form.getValues('min');
                            return Number.isNaN(m) || v > m || '최대값은 최소값보다 커야 합니다.';
                        },
                    })}
                />
                <S.ErrorText>{errors.max?.message}</S.ErrorText>
            </S.Field>

            <S.Field>
                <S.LabelText>
                    기본값<small>(비우면 80)</small>
                </S.LabelText>
                <Input
                    type="number"
                    placeholder="80"
                    {...register('start', {
                        valueAsNumber: true,
                        validate: (v) => {
                            const mn = Number(form.getValues('min'));
                            const mx = Number(form.getValues('max'));
                            const numV = Number(v);
                            return Number.isNaN(numV) || (numV >= mn && numV <= mx) || '기본값은 범위 내여야 합니다.';
                        },
                    })}
                />
                <S.ErrorText>{errors.start?.message}</S.ErrorText>
            </S.Field>

            <Button type="submit" disabled={!isValid}>
                줄자 시작
            </Button>
        </S.Form>
    );
}
