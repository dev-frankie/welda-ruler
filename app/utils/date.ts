export function kstTimestamp(): string {
    return new Intl.DateTimeFormat('sv-SE', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    })
        .format(new Date())
        .replace(' ', ' ');
}

export const toTime = (t: string) => new Date(t.replace(' ', 'T') + 'Z').getTime();
