import { format } from 'date-fns';

export function toNewDate(date: string) {
    const [year, month, day] = date?.split('-').map(Number);
    const formattedDate = new Date(year, month - 1, day);
    return formattedDate;
}

export function toModifiedDate(date: Date) {
    return format(date, 'yyyy-MM-dd');
}
