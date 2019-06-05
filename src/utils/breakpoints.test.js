import { BREAKPOINT_CHANGE } from './breakpoints.js';

test('should export a constant for the breakpoint change custom event type', () => {
  expect(BREAKPOINT_CHANGE).toBe('breakpointchange');
});
