/**
 * Simple way to declaratively set event tracking on an element.
 * Usage:
 * <a data-ga-on="click" data-ga-category="foo" data-ga-action="bar" />
 * <form data-ga-on="submit" data-ga-category="foo" data-ga-action="bar" data-ga-label="baz" />
 * @param {Element} element Element to apply tracking to.
 */
export class EventTracker {
  constructor(element) {
    if (!element) {
      return;
    }

    this.element = element;
    this.type = element.dataset.gaOn;
    this.category = element.dataset.gaCategory;
    this.action = element.dataset.gaAction;
    this.label = element.dataset.gaLabel || '';

    if (!this.type || !this.category || !this.action) {
      return;
    }

    this.bindEvents();
  }

  /**
   * Binds the relevant event based on the data-ga-on attribute on the element.
   */
  bindEvents() {
    this.element.addEventListener(
      this.type,
      () => {
        if (window.ga) {
          window.ga('send', 'event', this.category, this.action, this.label);
        }
      },
      false
    );
  }
}
