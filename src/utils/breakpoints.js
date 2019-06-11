export const BREAKPOINT_CHANGE = 'breakpointchange';

/**
 * Works in conjunction with a :before pseudo element on the body element to
 * fire a custom event when the current breakpoint changes.
 */
class Breakpoints {
  constructor() {
    this.currentBreakpoint = null;
    this.handleResize();

    window.addEventListener('resize', this.handleResize.bind(this), {
      passive: true
    });
  }

  /**
   * Returns the current breakpoint.
   * @return {string} Breakpoint name.
   */
  static getCurrentBreakpoint() {
    return Breakpoints.prototype.parseBreakpointFromStyle();
  }

  /**
   * Parses the value of the content property on the body:before pseudo element
   * to get the current breakpoint.
   * @return {string} Breakpoint name.
   */
  parseBreakpointFromStyle() {
    return window
      .getComputedStyle(document.body, ':before')
      .content.replace(/'|"/g, '');
  }

  /**
   * Checks if the current breakpoint has changed and emits a custom event on
   * the <html> element if it so.
   */
  handleResize() {
    let breakpoint = this.parseBreakpointFromStyle();

    if (breakpoint !== this.currentBreakpoint) {
      this.currentBreakpoint = breakpoint;

      let event = new CustomEvent(BREAKPOINT_CHANGE, {
        detail: {
          breakpoint
        }
      });

      document.documentElement.dispatchEvent(event);
    }
  }
}

export default Breakpoints;
