'use client';

import { useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface FormValues {
    min: number;
    max: number;
    start: number | '';
}

export function useSettingsForm(): {
    form: UseFormReturn<FormValues>;
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
} {
    const router = useRouter();
    const form = useForm<FormValues>({
        mode: 'onChange',
        defaultValues: { min: 50, max: 120, start: '' },
    });

    const { watch, trigger, handleSubmit } = form;
    const min = watch('min');
    const max = watch('max');

    useEffect(() => {
        trigger(['min', 'max', 'start']);
    }, [min, max, trigger]);

    const onSubmit = handleSubmit(({ min, max, start }) => {
        const def = Number.isNaN(start as number) ? 80 : start;
        router.push(`/ruler?min=${min}&max=${max}&default=${def}`);
    });

    return { form, onSubmit };
}
