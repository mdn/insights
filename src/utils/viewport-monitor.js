export const APPEARED = 'appeared';
export const DISAPPEARED = 'disappeared';

class ViewportMonitor {
  constructor(element) {
    if (!element) {
      return;
    }

    this.element = element;
    this.lastScrollY = window.scrollY;
    this.isScrolling = false;
    this.isElementVisible = false;

    this.bindEvents();
    this.handleScrollOrResize();
  }

  bindEvents() {
    this.scrollListener = window.addEventListener(
      'scroll',
      this.handleScrollOrResize.bind(this)
    );
    this.resizeListener = window.addEventListener(
      'resize',
      this.handleScrollOrResize.bind(this)
    );
  }

  destroy() {
    window.removeEventListener(this.scrollListener);
    window.removeEventListener(this.resizeListener);
  }

  handleScrollOrResize() {
    this.lastScrollY = window.scrollY;

    if (!this.isScrolling) {
      window.requestAnimationFrame(this.calculateVisibility.bind(this));

      this.isScrolling = true;
    }
  }

  calculateVisibility() {
    this.isScrolling = false;

    const elementOffsetTop = this.element.offsetTop;
    const elementHeight = this.element.getBoundingClientRect().height;
    const viewportHeight = document.documentElement.clientHeight;
    let isVisible;

    if (elementOffsetTop > this.lastScrollY + viewportHeight) {
      isVisible = false;
    } else {
      isVisible = elementOffsetTop + elementHeight > this.lastScrollY;
    }

    if (isVisible !== this.isElementVisible) {
      const eventType = isVisible ? APPEARED : DISAPPEARED;

      this.triggerEvent(eventType);
      this.isElementVisible = isVisible;
    }
  }

  triggerEvent(eventType) {
    const event = new CustomEvent(eventType, {
      detail: {
        scrollY: this.lastScrollY
      }
    });

    this.element.dispatchEvent(event);
  }
}

export default ViewportMonitor;
