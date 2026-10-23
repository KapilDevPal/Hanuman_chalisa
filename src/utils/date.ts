/** YYYY-MM-DD in the device's local timezone (toISOString would use UTC). */
export const toLocalDateKey = (date: Date = new Date()) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
};

/** Parses a YYYY-MM-DD key as a local date (new Date('YYYY-MM-DD') would parse as UTC). */
export const fromLocalDateKey = (key: string) => {
    const [y, m, d] = key.split('-').map(Number);
    return new Date(y, m - 1, d);
};
