import type { expect } from '@jest/globals';
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module '@jest/globals' {
  export interface Matchers<R extends void | Promise<void>>
    extends TestingLibraryMatchers<any, R> {}
}

declare global {
  namespace Vi {
    interface JestAssertion<T = any> extends TestingLibraryMatchers<T, void> {}
  }
}

export {};
