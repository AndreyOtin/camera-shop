import { render, screen } from '@testing-library/react';
import Footer from './footer';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <Footer/>
    );

    expect(screen.getByText('Навигация')).toBeInTheDocument();
    expect(screen.getByText('Курсы операторов')).toBeInTheDocument();
  });
});
