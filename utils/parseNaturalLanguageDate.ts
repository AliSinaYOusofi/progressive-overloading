import { add, sub, parseISO } from 'date-fns';

export default function parseNaturalLanguageDate(text : string) : Date {
  const now = new Date();
  
  const match = text.match(/(\d+)\s+(day|week|month|year)s?/);
  
  if (!match) {
    throw new Error('Unsupported date format');
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case 'day':
      return add(now, { days: value });
    case 'week':
      return add(now, { weeks: value });
    case 'month':
      return add(now, { months: value });
    case 'year':
      return add(now, { years: value });
    default:
      throw new Error('Unsupported date unit');
  }
}
