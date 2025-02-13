/// <reference types="@testing-library/jest-dom" />

declare namespace jest {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toHaveClass(...classNames: string[]): R;
    toHaveAttribute(attr: string, value?: string): R;
    toBeRequired(): R;
    toHaveTextContent(text: string | RegExp): R;
    toBeDisabled(): R;
  }
}

// Для поддержки глобальных моков
declare global {
  interface Window {
    matchMedia: jest.Mock;
  }

  let localStorage: {
    getItem: jest.Mock;
    setItem: jest.Mock;
    clear: jest.Mock;
    removeItem: jest.Mock;
    length: number;
    key: jest.Mock;
  };
}

export {};
