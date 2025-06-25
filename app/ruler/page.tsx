import { Suspense } from 'react';
import RulerClient from './RulerClient';

export default function RulerPage() {
    return (
        <Suspense fallback={<p style={{ padding: 24 }}>Loading ruler…</p>}>
            <RulerClient />
        </Suspense>
    );
}
