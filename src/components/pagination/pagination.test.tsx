import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utiils/jest';
import Pagination from './pagination';

describe('Component: Pagination', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <Pagination bannerPosition={0} camerasCount={20} currentPage={1}/>
      </ProviderWrapper>
    );


    expect(screen.getByText('Далее')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.queryByText('4')).not.toBeInTheDocument();
  });
});
