import { render, screen } from '@testing-library/react';
import CatalogSort from './catalog-sort';

describe('Component: CatalogSort', () => {
  it('should render correctly', () => {
    render(
      <CatalogSort/>
    );

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
    expect(screen.getByLabelText('по популярности')).toBeInTheDocument();
  });
});
