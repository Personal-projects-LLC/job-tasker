import { render, screen } from '@testing-library/react';
import { Sample } from './Sample';

describe('Sample Component', () => {
  test('renders a heading with text "Sample Component"', () => {
    render(<Sample data={{}} />);
    // Используем getByRole для поиска заголовка с игнорированием регистра
    const heading = screen.getByRole('heading', { name: /sample component/i });
    expect(heading).toBeInTheDocument();
  });
});
