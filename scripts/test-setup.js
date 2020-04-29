const noop = () => {};
Object.defineProperty(window, "scrollTo", { value: noop, writable: true });

global.IntersectionObserver = class IntersectionObserver {
  constructor() {}

  observe() {
    return null;
  }

  unobserve() {
    return null;
  }
};
