import Breakpoints, { BREAKPOINT_CHANGE } from '../utils/breakpoints.js';
import ViewportMonitor, {
  APPEARED,
  DISAPPEARED
} from '../utils/viewport-monitor.js';

class Header {
  constructor(element) {
    if (!element) {
      return;
    }

    this.element = element;
    this.introSection = document.getElementById('section-intro');
    // Breakpoints where the header can be fixed.
    this.fixedBps = ['tablet', 'desktop', 'wide'];

    // @TODO: Remove this by adjusting Webpack so that CSS loads before the JS.
    setTimeout(() => {
      this.bindViewportEvents(Breakpoints.getCurrentBreakpoint());
    }, 500);

    document.documentElement.addEventListener(BREAKPOINT_CHANGE, event => {
      this.bindViewportEvents(event.detail.breakpoint);
    });
  }

  /**
   * Binds viewport events. Returns before binding them if we're not on one of
   * the breakpoints defined above.
   * @param {string} breakpoint Current breakpoint.
   */
  bindViewportEvents(breakpoint) {
    if (!this.fixedBps.includes(breakpoint)) {
      return;
    }

    this.vm = new ViewportMonitor(this.introSection);

    this.introSection.addEventListener(
      APPEARED,
      this.hideFixedHeader.bind(this)
    );
    this.introSection.addEventListener(
      DISAPPEARED,
      this.showFixedHeader.bind(this)
    );
  }

  /**
   * Handle showing the fixed header.
   * @param {CustomEvent} event Custom event object.
   */
  showFixedHeader(event) {
    if (event.detail.scrollY < 300) {
      return;
    }

    this.element.classList.add('is-fixed');
    document.body.classList.add('is-header-fixed');

    setTimeout(() => {
      this.element.classList.add('is-visible');
    }, 200);
  }

  /**
   * Handle hiding the fixed header.
   */
  hideFixedHeader() {
    this.element.classList.remove('is-visible');

    setTimeout(() => {
      this.element.classList.remove('is-fixed');
      document.body.classList.remove('is-header-fixed');
    }, 200);
  }
}

export default Header;
