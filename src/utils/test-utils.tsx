import React from 'react';
import { render, RenderOptions } from '@testing-library/react';

// Mock the theme provider inline instead of importing from __mocks__
const MockThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <div data-testid="mock-theme-provider">{children}</div>;
};

jest.mock('../contexts/theme-context', () => ({
  ThemeProvider: MockThemeProvider,
}));

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <MockThemeProvider>{children}</MockThemeProvider>;
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
