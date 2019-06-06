import { APPEARED, DISAPPEARED } from './viewport-monitor.js';

test('should export a constant for the appeared custom event type', () => {
  expect(APPEARED).toBe('appeared');
});

test('should export a constant for the disappeared custom event type', () => {
  expect(DISAPPEARED).toBe('disappeared');
});
