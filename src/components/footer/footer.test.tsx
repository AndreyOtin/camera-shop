import { render, screen } from '@testing-library/react';
import Footer from './footer';
import { ProviderWrapper } from '../../utiils/jest';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <Footer/>
      </ProviderWrapper>
    );

    expect(screen.getByText('Навигация')).toBeInTheDocument();
    expect(screen.getByText('Курсы операторов')).toBeInTheDocument();
  });
});
