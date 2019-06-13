import Breakpoints from '../utils/breakpoints.js';
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
    this.downloadButton = element.querySelector('.header__button');
    this.introSection = document.getElementById('section-intro');
    // Breakpoints where the header can be fixed.
    this.headerFixedBps = ['tablet', 'desktop', 'wide'];
    // Breakpoints where the button can be fixed.
    this.buttonFixedBps = ['mobile'];

    this.bindEvents();
  }

  /**
   * Event binding for the component.
   */
  bindEvents() {
    this.vm = new ViewportMonitor(this.introSection);

    this.introSection.addEventListener(APPEARED, () => {
      this.hideFixedHeader();
      this.hideFixedButton();
    });
    this.introSection.addEventListener(DISAPPEARED, event => {
      this.showFixedHeader(event);
      this.showFixedButton(event);
    });
  }

  /**
   * Handle showing the fixed header.
   * @param {CustomEvent} event Event object.
   */
  showFixedHeader(event) {
    let currentBreakpoint = Breakpoints.getCurrentBreakpoint();

    if (
      event.detail.scrollY < 300 ||
      !this.headerFixedBps.includes(currentBreakpoint)
    ) {
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

  /**
   * Handle showing the fixed button.
   * @param {CustomEvent} event Event object.
   */
  showFixedButton(event) {
    let currentBreakpoint = Breakpoints.getCurrentBreakpoint();

    if (
      event.detail.scrollY < 300 ||
      !this.buttonFixedBps.includes(currentBreakpoint)
    ) {
      return;
    }

    this.downloadButton.classList.add('is-fixed');
    document.body.classList.add('is-download-button-fixed');
  }

  /**
   * Handle hiding the fixed button.
   */
  hideFixedButton() {
    this.downloadButton.classList.remove('is-fixed');
    document.body.classList.remove('is-download-button-fixed');
  }
}

export default Header;
