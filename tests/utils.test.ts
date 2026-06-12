import { describe, it, expect } from 'vitest';
import { formatDate } from '../src/lib/utils';

describe('formatDate', () => {
  it('returns empty string for undefined input', () => {
    expect(formatDate(undefined)).toBe('');
  });

  it('formats a valid ISO date with default pattern', () => {
    expect(formatDate('2024-01-15')).toBe('Jan 15, 2024');
  });

  it('formats with a custom pattern', () => {
    expect(formatDate('2024-06-01', 'yyyy-MM-dd')).toBe('2024-06-01');
  });

  it('returns empty string for invalid date string', () => {
    expect(formatDate('not-a-date')).toBe('');
  });

  it('returns empty string for empty string input', () => {
    expect(formatDate('')).toBe('');
  });
});
