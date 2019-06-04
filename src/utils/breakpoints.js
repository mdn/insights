export const BREAKPOINT_CHANGE = 'breakpointchange';

class Breakpoints {
  constructor() {
    this.currentBreakpoint = null;
    this.handleResize();

    window.addEventListener('resize', this.handleResize.bind(this), {
      passive: true
    });
  }

  static getCurrentBreakpoint() {
    return Breakpoints.prototype.parseBreakpointFromStyle();
  }

  parseBreakpointFromStyle() {
    return window
      .getComputedStyle(document.body, ':before')
      .content.replace(/'|"/g, '');
  }

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
