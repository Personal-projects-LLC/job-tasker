import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import Sample from './Sample';

describe('Sample Component', () => {
  test('renders a heading with text "Sample Component"', () => {
    render(<Sample data={{ ankap: 'ankapObj' }} />);

    const heading = screen.getByRole('heading', { name: /sample component/i });
    const content = screen.getByText('ankapObj');

    expect(heading).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });
});
