import { render, screen } from '@testing-library/react';
import CatalogFilter from './catalog-filter';

describe('Component: CatalogFilter', () => {
  it('should render correctly', () => {
    render(
      <CatalogFilter/>
    );

    expect(screen.getByText('Фотокамера')).toBeInTheDocument();
    expect(screen.getByText('Тип камеры')).toBeInTheDocument();
  });
});
