/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

declare global {
  namespace jest {
    interface Expect {
      toBeInTheDocument(): any;
      toHaveClass(...classNames: string[]): any;
      toHaveAttribute(attr: string, value?: string): any;
      toBeVisible(): any;
      toBeDisabled(): any;
      toHaveTextContent(text: string | RegExp): any;
      toHaveBeenCalledWith(...args: unknown[]): any;
      toBeRequired(): any;
      toBeEmptyDOMElement(): any;
      toHaveLength(length: number): any;
      toBe(expected: any): any;
      toHaveValue(value?: string | string[] | number | null): any;
      toContainElement(element: HTMLElement | null): any;
      toBeValid(): any;
      toBeInvalid(): any;
      toHaveStyle(css: Record<string, any>): any;
      toHaveFocus(): any;
      toBeChecked(): any;
      toBePartiallyChecked(): any;
      toHaveDescription(text: string | RegExp): any;
      toHaveDisplayValue(
        value: string | string[] | RegExp | Array<string | RegExp>
      ): any;
    }

    interface InverseAsymmetricMatchers extends Expect {}
  }

  // Extend the global expect
  interface Expect extends jest.Expect {}
  interface InverseAsymmetricMatchers extends jest.InverseAsymmetricMatchers {}
}

declare module '@testing-library/jest-dom' {
  export {};
}
