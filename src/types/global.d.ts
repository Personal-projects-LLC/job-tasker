/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

declare global {
  namespace jest {
    interface Matchers<R = void> {
      toBeInTheDocument(): R;
      toHaveClass(...classNames: string[]): R;
      toHaveAttribute(attr: string, value?: string): R;
      toBeVisible(): R;
      toBeDisabled(): R;
      toHaveTextContent(text: string | RegExp): R;
      toHaveBeenCalledWith(...args: unknown[]): R;
      toBeRequired(): R;
      toBeEmptyDOMElement(): R;
      toHaveLength(length: number): R;
      toBe(expected: any): R;
      toHaveValue(value?: string | string[] | number | null): R;
      toContainElement(element: HTMLElement | null): R;
      toBeValid(): R;
      toBeInvalid(): R;
      toHaveStyle(css: Record<string, any>): R;
      toHaveFocus(): R;
      toBeChecked(): R;
      toBePartiallyChecked(): R;
      toHaveDescription(text: string | RegExp): R;
      toHaveDisplayValue(
        value: string | string[] | RegExp | Array<string | RegExp>
      ): R;
    }
  }
}

export {};
