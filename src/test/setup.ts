import '@testing-library/jest-dom';
import { expect } from '@jest/globals';

// Add custom matchers
expect.extend({
  toBeInTheDocument(received) {
    const pass = received !== null;
    return {
      message: () =>
        `expected ${received} ${pass ? 'not ' : ''}to be in the document`,
      pass,
    };
  },
  toHaveClass(...args: [unknown, ...string[]]) {
    const [element, ...classNames] = args;
    const pass = classNames.every((className) =>
      (element as HTMLElement).classList.contains(className)
    );
    return {
      message: () =>
        `expected element ${pass ? 'not ' : ''}to have classes: ${classNames.join(
          ', '
        )}`,
      pass,
    };
  },
});
