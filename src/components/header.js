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

    const introSectionEl = document.getElementById('section-intro');

    this.vm = new ViewportMonitor(introSectionEl);

    introSectionEl.addEventListener(APPEARED, () => {
      this.element.classList.remove('is-fixed');
      document.body.classList.remove('is-header-fixed');
    });
    introSectionEl.addEventListener(DISAPPEARED, () => {
      this.element.classList.add('is-fixed');
      document.body.classList.add('is-header-fixed');
    });
  }
}

export default Header;
