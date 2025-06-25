'use client';

import { POINTER_ALIGN_OFFSET, POINTER_CSS_OFFSET, PX_CM } from '@/app/config/ruler';
import React, { useCallback, useEffect, useRef } from 'react';
import { Tick } from '../../atoms/Tick';
import { TickLabel } from '../../atoms/TickLabel';
import * as S from './Ruler.style';

interface RulerProps {
    min: number;
    max: number;
    value: number;
    onChange: (val: number) => void;
}

export default function Ruler({ min, max, value, onChange }: RulerProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const scaleRef = useRef<HTMLDivElement>(null);

    const viewportW = useRef(0);
    // 포인터 CSS 오프셋을 반영한 실제 중앙 위치
    const effectiveCenterX = () => viewportW.current / 2 - POINTER_CSS_OFFSET;

    const txStart = useRef(0); // drag 시작 시 translateX
    const xStart = useRef<number | null>(null); // drag 시작 pointer x
    const rafId = useRef<number | null>(null);

    const alignToValue = useCallback(
        (cm: number) => {
            if (!scaleRef.current) return;
            const pxOffset = (cm - min) * PX_CM;
            const tx = effectiveCenterX() - POINTER_ALIGN_OFFSET - pxOffset;
            scaleRef.current.style.transform = `translateX(${tx}px)`;
            txStart.current = tx; // alignToValue 호출 후 txStart도 업데이트
        },
        [min],
    );

    const pointerDown = (e: React.PointerEvent) => {
        e.preventDefault();
        if (!scaleRef.current) return;

        scaleRef.current.style.transition = 'none'; // 즉시 반응

        xStart.current = e.clientX;
        const currentTx = getCurrentTx();
        txStart.current = currentTx;

        window.addEventListener('pointermove', pointerMove);
        window.addEventListener('pointerup', pointerUp);
        window.addEventListener('pointercancel', pointerUp);
    };

    const pointerMove = (e: PointerEvent) => {
        if (xStart.current == null || !scaleRef.current) return;

        if (rafId.current) {
            cancelAnimationFrame(rafId.current);
            rafId.current = null;
        }

        rafId.current = requestAnimationFrame(() => {
            const dx = e.clientX - xStart.current!;
            const speedFactor = 0.3; // 감속 계수
            let nextTx = txStart.current + dx * speedFactor;

            // min 값이 포인터 중앙에 올 때의 translateX
            const maxTx = effectiveCenterX() - POINTER_ALIGN_OFFSET;
            // max 값이 포인터 중앙에 올 때의 translateX
            const minTx = effectiveCenterX() - POINTER_ALIGN_OFFSET - (max - min) * PX_CM;

            if (nextTx > maxTx) nextTx = maxTx;
            if (nextTx < minTx) nextTx = minTx;

            scaleRef.current!.style.transform = `translateX(${nextTx}px)`;

            /* cm 환산 & 리프트 */
            const cm = min + (effectiveCenterX() - nextTx - POINTER_ALIGN_OFFSET) / PX_CM;
            onChange(Math.round(cm * 10) / 10); // 소수점 1자리 반올림
        });
    };

    const pointerUp = () => {
        window.removeEventListener('pointermove', pointerMove);
        window.removeEventListener('pointerup', pointerUp);
        xStart.current = null;

        if (scaleRef.current) {
            scaleRef.current.style.transition = 'transform .2s ease-out';
        }
        if (rafId.current) {
            cancelAnimationFrame(rafId.current);
            rafId.current = null;
        }
    };

    /* --------------------------------------------------------
     *  Helper: translateX 현재값 파싱 & value 중앙 맞추기
     * ------------------------------------------------------*/
    const getCurrentTx = () => {
        if (!scaleRef.current) return 0;
        const match = /translateX\((-?\d+(?:\.\d+)?)px\)/.exec(scaleRef.current.style.transform);
        return match ? parseFloat(match[1]) : 0;
    };

    /* --------------------------------------------------------
     *  눈금 배열 (0.1 cm 단위) & 스케일 전체 길이
     * ------------------------------------------------------*/
    const ticks: number[] = [];
    for (let cm = min; cm <= max + 1e-9; cm += 0.1) ticks.push(+cm.toFixed(1));

    // scaleWidth: 모든 눈금을 포함하고 양쪽에 충분한 여백을 가질 수 있도록
    // (max - min) * PX_CM: 실제 눈금의 총 길이
    // viewportW.current: 화면 너비 (양쪽 여백을 위해 추가)
    // POINTER_ALIGN_OFFSET * 2: 양쪽 끝 눈금 정렬을 위한 추가 여백
    const scaleWidth = (max - min) * PX_CM + viewportW.current + POINTER_ALIGN_OFFSET * 2;

    /* viewport 측정 ---------------------------------------- */
    useEffect(() => {
        const measure = () => {
            if (wrapperRef.current) viewportW.current = wrapperRef.current.offsetWidth;
            // value 초기 정렬
            alignToValue(value);
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, [alignToValue, value]);

    /* value prop 변경 시 중앙 정렬 -------------------------- */
    useEffect(() => {
        alignToValue(value);
    }, [value, min, alignToValue]); // min이 바뀌면 다시 정렬해야 함

    return (
        <S.Wrapper ref={wrapperRef} role="slider" onPointerDown={pointerDown}>
            <S.Pointer />
            <S.Scale ref={scaleRef} style={{ width: scaleWidth }}>
                {ticks.map((t, i) => {
                    const major = Math.round(t * 10) % 10 === 0;
                    return (
                        <Tick key={t} $major={major} $first={i === 0}>
                            {major && <TickLabel>{Math.round(t)}</TickLabel>}
                        </Tick>
                    );
                })}
            </S.Scale>
        </S.Wrapper>
    );
}
