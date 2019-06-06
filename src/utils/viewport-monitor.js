export const APPEARED = 'appeared';
export const DISAPPEARED = 'disappeared';

/**
 * Monitors whether an element is visible in the viewport or not. Fires a custom
 * event on that element with the value of 'appeared' or 'disappeared'.
 */
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

  /**
   * Bind relevant events.
   */
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

  /**
   * Teardown processes for the component.
   */
  destroy() {
    window.removeEventListener(this.scrollListener);
    window.removeEventListener(this.resizeListener);
  }

  /**
   * Handles scrolling and resize events.
   */
  handleScrollOrResize() {
    this.scollDirection = window.scrollY > this.lastScrollY ? 'down' : 'up';
    this.lastScrollY = window.scrollY;

    // Prevent multiple rAFs from being queued.
    if (!this.isScrolling) {
      window.requestAnimationFrame(this.calculateVisibility.bind(this));

      this.isScrolling = true;
    }
  }

  /**
   * Calculates the element's visibility based on the current scroll top,
   * element top offset and its height. An element must have completely left
   * the viewport for the 'disappeared' event to fire.
   */
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

  /**
   * Triggers the custom event on the target element.
   * @param {string} eventType Event type to fire.
   */
  triggerEvent(eventType) {
    if (typeof window.CustomEvent !== 'function') {
      return;
    }

    const event = new CustomEvent(eventType, {
      detail: {
        scrollY: this.lastScrollY,
        scrollDirection: this.scollDirection
      }
    });

    this.element.dispatchEvent(event);
  }
}

export default ViewportMonitor;
