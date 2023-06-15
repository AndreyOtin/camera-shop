import Breadcrumbs from './breadcrumbs';
import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utiils/jest';

describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <Breadcrumbs/>
      </ProviderWrapper>
    );

    expect(screen.getByText('Главная')).toBeInTheDocument();
  });
});
