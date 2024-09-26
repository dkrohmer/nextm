import { formatDate } from '../../../renderer/utils/formatters';

describe('formatDate', () => {
  it('should format a valid date string to YYYY-MM-DD format', () => {
    const validDateString = '2023-09-18T14:35:00Z';
    const result = formatDate(validDateString);
    expect(result).toBe('2023-09-18');
  });

  it('should return the current date when an invalid date string is provided', () => {
    const result = formatDate('invalid-date-string');
    const expected = new Date().toISOString().split('T')[0];
    expect(result).toBe(expected);
  });

  it('should return the current date when no date string is provided', () => {
    const result = formatDate('');
    const expected = new Date().toISOString().split('T')[0];
    expect(result).toBe(expected);
  });
});
