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
    this.fixedBps = ['tablet', 'desktop', 'wide'];

    this.bindViewportEvents(Breakpoints.getCurrentBreakpoint());

    document.documentElement.addEventListener(BREAKPOINT_CHANGE, event => {
      this.bindViewportEvents(event.detail.breakpoint);
    });
  }

  bindViewportEvents(breakpoint) {
    if (!this.fixedBps.includes(breakpoint)) {
      return;
    }

    this.vm = new ViewportMonitor(this.introSection);

    this.introSection.addEventListener(
      APPEARED,
      this.showFixedHeader.bind(this)
    );
    this.introSection.addEventListener(
      DISAPPEARED,
      this.hideFixedHeader.bind(this)
    );
  }

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

  hideFixedHeader() {
    this.element.classList.remove('is-visible');

    setTimeout(() => {
      this.element.classList.remove('is-fixed');
      document.body.classList.remove('is-header-fixed');
    }, 200);
  }
}

export default Header;
