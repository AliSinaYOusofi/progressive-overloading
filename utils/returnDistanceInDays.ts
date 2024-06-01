import { differenceInDays, parseISO } from 'date-fns';

export default function distanceFromNowInDays(isoDateString : string) {
    const now = new Date();
    const targetDate = parseISO(isoDateString);
    return differenceInDays(targetDate, now);
}

