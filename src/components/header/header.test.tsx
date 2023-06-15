import { render, screen } from '@testing-library/react';
import Header from './header';
import { ProviderWrapper } from '../../utiils/jest';

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <Header/>
      </ProviderWrapper>
    );

    expect(screen.getByTestId('form-search')).toBeInTheDocument();
    expect(screen.getByText('Сбросить поиск')).toBeInTheDocument();
  });
});
